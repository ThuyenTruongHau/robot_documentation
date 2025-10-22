from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductImageViewSet, compare_products_with_ai

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'images', ProductImageViewSet, basename='productImage')

urlpatterns = [
    path('', include(router.urls)),
    path('compare-ai/', compare_products_with_ai, name='compare-products-ai'),
]