# apps/product/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer

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
