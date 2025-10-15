from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    """
    Serializer để validate dữ liệu contact form
    Không cần Model vì chỉ gửi email, không lưu DB
    """
    full_name = serializers.CharField(
        max_length=255,
        required=False,
    )
    
    email = serializers.EmailField(
        required=True,
        error_messages={
            'required': 'Vui lòng nhập email',
            'invalid': 'Email không hợp lệ'
        }
    )
    
    company = serializers.CharField(
        max_length=255,
        required=False,
        allow_blank=True
    )
    
    phone_number = serializers.CharField(
        max_length=20,
        required=True,
        error_messages={
            'required': 'Vui lòng nhập số điện thoại',
            'blank': 'Số điện thoại không được để trống'
        }
    )
    
    message = serializers.CharField(
        required=True,
        error_messages={
            'required': 'Vui lòng nhập nội dung',
            'blank': 'Nội dung không được để trống'
        }
    )
    
    def validate_phone_number(self, value):
        """Validate định dạng số điện thoại cơ bản"""
        # Loại bỏ khoảng trắng và ký tự đặc biệt
        cleaned = ''.join(filter(str.isdigit, value))
        
        if len(cleaned) < 9 or len(cleaned) > 15:
            raise serializers.ValidationError('Số điện thoại không hợp lệ')
        
        return value

