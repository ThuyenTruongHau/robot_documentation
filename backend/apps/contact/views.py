from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.conf import settings
from .serializers import ContactSerializer
import logging

logger = logging.getLogger(__name__)


class ContactAPIView(APIView):
    """
    API endpoint để nhận thông tin contact và gửi email
    POST /api/contact/
    """
    
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        
        try:
            # Tạo nội dung email
            subject1 = f"[RFID Thado Robot] Customer Information"
            
            message_body = f"""
                Thông tin liên hệ mới từ website RFID:

                Họ tên: {data.get('full_name', 'Không có')}
                Email: {data['email']}
                Công ty: {data.get('company', 'Không có')}
                Số điện thoại: {data.get('phone_number', 'Không có')}

                Nội dung:
                {data['message']}

                ---
                Email này được gửi tự động từ form liên hệ trên website Thado Robot.
            """

            subject2 = f"[RFID Thado Robot] Cảm ơn bạn đã liên hệ với ThadoSoft"

            html_content = f"""
                <html>
                <body>
                    <p>Cảm ơn bạn đã liên hệ với chúng tôi, đội ngũ kỹ thuật sẽ phản hồi sớm nhất.</p>

                    <p><b>Họ tên:</b> {data.get('full_name', 'Không có')}<br>
                    <b>Email:</b> {data['email']}<br>
                    <b>Công ty:</b> {data.get('company', 'Không có')}<br>
                    <b>Số điện thoại:</b> {data.get('phone_number', 'Không có')}</p>

                    <p><b>Nội dung:</b><br>{data['message']}</p>

                    <hr>

                    <p>
                        <img src="https://rfid.thadorobot.com/logo_noback.png" alt="ThadoSoft Logo" style="width:150px;"><br>
                        THADOSOFT TECHNOLOGY SOLUTION JSC<br>
                        Website:
                        <a href="https://rfid.thadorobot.com">rfid.thadorobot.com</a><br>
                        Email: info@thadorobot.com
                    </p>
                </body>
                </html>
            """

            
            # Gửi Email 1: Text email cho admin
            try:
                email1 = EmailMessage(
                    subject=subject1,
                    body=message_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[settings.CONTACT_EMAIL],
                    reply_to=[data['email']]
                )
                email1.send(fail_silently=False)
                logger.info(f"✅ Email 1 (Admin notification) sent to {settings.CONTACT_EMAIL}")
            except Exception as e:
                logger.error(f"❌ Failed to send Email 1: {str(e)}")
                # Vẫn tiếp tục gửi email 2
            
            # Gửi Email 2: HTML email cho khách hàng
            try:
                email2 = EmailMultiAlternatives(
                    subject=subject2,
                    body="Cảm ơn bạn đã liên hệ với ThadoSoft.",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[data['email']],
                )
                email2.attach_alternative(html_content, "text/html")
                result = email2.send(fail_silently=False)
                logger.info(f"✅ Email 2 (Customer thank you) sent to {data['email']} - Result: {result}")
            except Exception as e:
                logger.error(f"❌ Failed to send Email 2 to {data['email']}: {str(e)}")
                logger.error(f"Error details: {type(e).__name__}")
            
            return Response({
                'success': True,
                'message': 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            
            return Response({
                'success': False,
                'message': 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

