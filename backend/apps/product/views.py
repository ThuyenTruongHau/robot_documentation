# apps/product/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    API cho Product (CRUD).
    Swagger sẽ tự động sinh docs từ serializer + viewset.
    """
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    #permission_classes = [IsAuthenticated]

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    #permission_classes = [IsAuthenticated]
