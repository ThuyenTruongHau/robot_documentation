# apps/product/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.conf import settings
import google.generativeai as genai
import json

from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer, ProductCompareSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    API cho Product (CRUD).
    Swagger sẽ tự động sinh docs từ serializer + viewset.
    """
    queryset = Product.objects.select_related('category', 'brand').prefetch_related('images').all().order_by("-created_at")
    serializer_class = ProductSerializer
    #permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Tìm kiếm products với fuzzy search.
        Tìm theo: product name, description, category name, brand name
        Không cần trùng 100% - hỗ trợ partial matching
        """
        query = request.GET.get('q', '').strip()
        category_id = request.GET.get('category', '')
        
        products = Product.objects.select_related('category').prefetch_related('images').all()
        
        # Fuzzy search - tìm kiếm không cần trùng 100%
        if query:
            # Split query into words for better matching
            query_words = query.lower().split()
            
            # Build Q objects for each word
            q_objects = Q()
            for i, word in enumerate(query_words):
                word_q = (
                    Q(name__icontains=word) |
                    Q(description__icontains=word) |
                    Q(category__name__icontains=word) |
                    Q(parameters__icontains=word)
                )
                if i == 0:
                    q_objects = word_q
                else:
                    q_objects &= word_q
            
            # Search in parameters JSONField
            products = products.filter(q_objects).distinct()
            
            # Rank results by relevance
            # Products with exact match in name should appear first
            exact_matches = []
            partial_matches = []
            
            for product in products:
                product_name_lower = product.name.lower()
                query_lower = query.lower()
                
                # Exact match or starts with query
                if query_lower in product_name_lower:
                    if product_name_lower.startswith(query_lower):
                        exact_matches.insert(0, product)  # Highest priority
                    else:
                        exact_matches.append(product)
                else:
                    partial_matches.append(product)
            
            # Combine results: exact matches first, then partial matches
            products = exact_matches + partial_matches
        else:
            products = list(products.order_by('-created_at'))
        
        # Filter by category if provided
        if category_id:
            products = [p for p in products if str(p.category_id) == str(category_id)]
        
        
        serializer = self.get_serializer(products, many=True)
        return Response({
            'results': serializer.data,
            'count': len(products),
            'query': query
        })

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    #permission_classes = [IsAuthenticated]


@api_view(['POST'])
def compare_products_with_ai(request):
    """
    API endpoint để so sánh 2-3 sản phẩm sử dụng Gemini AI.
    
    Request Body:
    {
        "product_ids": [1, 2, 3]  // Mảng 2-3 product IDs
    }
    
    Response:
    {
        "success": true,
        "comparison": {
            "overall": "Tổng quan so sánh...",
            "quality": "Đánh giá chất lượng...",
            "performance": "Đánh giá hiệu suất...",
            "integration": "Đánh giá khả năng tích hợp...",
            "recommendation": "Khuyến nghị..."
        }
    }
    """
    serializer = ProductCompareSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(
            {"success": False, "error": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    product_ids = serializer.validated_data['product_ids']
    language = serializer.validated_data.get('language', 'vi')
    
    # Validate number of products
    if len(product_ids) < 2:
        error_msg = "Cần ít nhất 2 sản phẩm để so sánh" if language == 'vi' else "At least 2 products required for comparison"
        return Response(
            {"success": False, "error": error_msg},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if len(product_ids) > 3:
        error_msg = "Chỉ có thể so sánh tối đa 3 sản phẩm" if language == 'vi' else "Maximum 3 products can be compared"
        return Response(
            {"success": False, "error": error_msg},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Fetch products
    try:
        products = Product.objects.filter(id__in=product_ids).select_related('category', 'brand')
        
        if products.count() != len(product_ids):
            error_msg = "Một hoặc nhiều sản phẩm không tồn tại" if language == 'vi' else "One or more products not found"
            return Response(
                {"success": False, "error": error_msg},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Prepare product data for Gemini
        products_data = []
        for product in products:
            product_info = {
                "name": product.name,
                "category": product.category.name if product.category else "N/A",
                "brand": product.brand.name if product.brand else "N/A",
                "description": product.description or "No description",
                "parameters": product.parameters or {}
            }
            products_data.append(product_info)
        
        # Call Gemini API
        try:
            comparison_result = analyze_products_with_gemini(products_data, language)
            
            return Response({
                "success": True,
                "comparison": comparison_result,
                "products_count": len(products),
                "ai_powered": True
            }, status=status.HTTP_200_OK)
            
        except Exception as gemini_error:
            # Khi Gemini lỗi, dùng fallback nhưng vẫn trả về success=True để UX tốt hơn
            error_prefix = "Lỗi khi gọi Gemini API" if language == 'vi' else "Error calling Gemini API"
            warning_msg_vi = "Đang sử dụng phân tích cơ bản do AI tạm thời không khả dụng"
            warning_msg_en = "Using basic analysis as AI is temporarily unavailable"
            
            return Response(
                {
                    "success": True,  # Vẫn success vì có fallback
                    "comparison": get_fallback_comparison(products_data, language),
                    "products_count": len(products),
                    "ai_powered": False,
                    "warning": warning_msg_vi if language == 'vi' else warning_msg_en,
                    "error_detail": f"{error_prefix}: {str(gemini_error)}"
                },
                status=status.HTTP_200_OK  # Trả về 200 vì vẫn có kết quả hữu ích
            )
    
    except Exception as e:
        return Response(
            {"success": False, "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def analyze_products_with_gemini(products_data, language='vi'):
    """
    Gọi Gemini AI để phân tích và so sánh sản phẩm.
    
    Args:
        products_data: List of product dictionaries
        language: 'vi' (Vietnamese) or 'en' (English)
    """
    # Configure Gemini
    api_key = getattr(settings, 'GEMINI_API_KEY', None)
    
    if not api_key:
        error_msg = "GEMINI_API_KEY chưa được cấu hình trong settings" if language == 'vi' else "GEMINI_API_KEY not configured in settings"
        raise Exception(error_msg)
    
    genai.configure(api_key=api_key)
    # Sử dụng gemini-1.5-flash (model mới, nhanh và miễn phí)
    # Có thể đổi sang 'gemini-1.5-pro' nếu cần phân tích sâu hơn
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    # Prepare prompt
    products_json = json.dumps(products_data, ensure_ascii=False, indent=2)
    
    # Prompts for different languages
    prompts = {
        'vi': f"""
Bạn là chuyên gia về sản phẩm RFID. Hãy phân tích và so sánh các sản phẩm sau đây:

{products_json}

Hãy trả về kết quả dưới dạng JSON với các trường sau (KHÔNG GIẢI THÍCH GÌ THÊM, CHỈ TRẢ VỀ JSON):
{{
    "overall": "Tổng quan so sánh ngắn gọn về các sản phẩm này (2-3 câu)",
    "quality": "Đánh giá chất lượng chung (1-2 câu)",
    "performance": "Đánh giá hiệu suất chung (1-2 câu)",
    "integration": "Đánh giá khả năng tích hợp (1-2 câu)",
    "recommendation": "Khuyến nghị sử dụng cho loại doanh nghiệp/mục đích nào (1-2 câu)"
}}

Lưu ý:
- Viết bằng tiếng Việt
- Ngắn gọn, súc tích
- Tập trung vào điểm mạnh chung của các sản phẩm được so sánh
- CHỈ TRẢ VỀ JSON, KHÔNG GIẢI THÍCH GÌ KHÁC
""",
        'en': f"""
You are an expert in RFID products. Please analyze and compare the following products:

{products_json}

Return the result as JSON with the following fields (NO EXTRA EXPLANATION, JSON ONLY):
{{
    "overall": "Brief overall comparison of these products (2-3 sentences)",
    "quality": "General quality assessment (1-2 sentences)",
    "performance": "General performance assessment (1-2 sentences)",
    "integration": "Integration capability assessment (1-2 sentences)",
    "recommendation": "Recommendation for which type of business/purpose to use (1-2 sentences)"
}}

Notes:
- Write in English
- Be concise and clear
- Focus on common strengths of the compared products
- RETURN JSON ONLY, NO OTHER EXPLANATION
"""
    }
    
    prompt = prompts.get(language, prompts['vi'])
    
    # Call Gemini
    response = model.generate_content(prompt)
    result_text = response.text.strip()
    
    # Extract JSON from response (in case Gemini adds extra text)
    if '```json' in result_text:
        result_text = result_text.split('```json')[1].split('```')[0].strip()
    elif '```' in result_text:
        result_text = result_text.split('```')[1].split('```')[0].strip()
    
    # Parse JSON
    try:
        comparison = json.loads(result_text)
        return comparison
    except json.JSONDecodeError:
        # Fallback if JSON parsing fails - bilingual
        fallback_vi = {
            "overall": result_text[:200] if len(result_text) < 200 else result_text[:200] + "...",
            "quality": "Các sản phẩm đều đạt tiêu chuẩn chất lượng cao.",
            "performance": "Hiệu suất ổn định và đáng tin cậy.",
            "integration": "Dễ dàng tích hợp với hệ thống hiện có.",
            "recommendation": "Phù hợp cho doanh nghiệp vừa và lớn."
        }
        fallback_en = {
            "overall": result_text[:200] if len(result_text) < 200 else result_text[:200] + "...",
            "quality": "All products meet high quality standards.",
            "performance": "Stable and reliable performance.",
            "integration": "Easy to integrate with existing systems.",
            "recommendation": "Suitable for medium to large enterprises."
        }
        return fallback_vi if language == 'vi' else fallback_en


def get_fallback_comparison(products_data, language='vi'):
    """
    Trả về comparison mặc định khi Gemini API không khả dụng.
    
    Args:
        products_data: List of product dictionaries
        language: 'vi' (Vietnamese) or 'en' (English)
    """
    product_count = len(products_data)
    categories = list(set([p.get('category', 'N/A') for p in products_data]))
    categories_str = ', '.join(categories)
    
    if language == 'vi':
        return {
            "overall": f"Đang so sánh {product_count} sản phẩm RFID thuộc các danh mục: {categories_str}. Tất cả đều là giải pháp chất lượng cao cho doanh nghiệp.",
            "quality": "Các sản phẩm đều đạt tiêu chuẩn chất lượng cao, được sản xuất bởi các nhà cung cấp uy tín trong ngành RFID.",
            "performance": "Hiệu suất ổn định với độ chính xác cao, phạm vi đọc xa và tốc độ xử lý nhanh. Phù hợp cho môi trường công nghiệp.",
            "integration": "Dễ dàng tích hợp với hệ thống quản lý hiện có thông qua các giao thức chuẩn (TCP/IP, RS232, USB). Hỗ trợ đa nền tảng.",
            "recommendation": "Khuyến nghị sử dụng cho các doanh nghiệp trong lĩnh vực logistics, manufacturing, warehousing và healthcare có nhu cầu quản lý tài sản và hàng hóa tự động."
        }
    else:  # English
        return {
            "overall": f"Comparing {product_count} RFID products in categories: {categories_str}. All are high-quality solutions for enterprises.",
            "quality": "All products meet high quality standards, manufactured by reputable suppliers in the RFID industry.",
            "performance": "Stable performance with high accuracy, long reading range, and fast processing speed. Suitable for industrial environments.",
            "integration": "Easy to integrate with existing management systems through standard protocols (TCP/IP, RS232, USB). Multi-platform support.",
            "recommendation": "Recommended for businesses in logistics, manufacturing, warehousing, and healthcare sectors requiring automated asset and inventory management."
        }
