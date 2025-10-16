# Backend API endpoint để trả về sitemap data
# Thêm vào backend Django (ví dụ: apps/core/views.py)

from django.http import JsonResponse
from django.utils import timezone
from apps.product.models import Product
from apps.category.models import Category

def sitemap_data(request):
    """
    API endpoint trả về data để generate sitemap
    """
    current_date = timezone.now().strftime('%Y-%m-%d')
    
    # Static pages
    static_pages = [
        {
            'url': '/',
            'priority': '1.0',
            'changefreq': 'weekly'
        },
        {
            'url': '/rfid-products',
            'priority': '0.9',
            'changefreq': 'weekly'
        },
        {
            'url': '/rfid-solutions',
            'priority': '0.9',
            'changefreq': 'weekly'
        },
        {
            'url': '/about-us',
            'priority': '0.8',
            'changefreq': 'monthly'
        },
        {
            'url': '/contact-us',
            'priority': '0.8',
            'changefreq': 'monthly'
        }
    ]
    
    # Categories
    categories = []
    for category in Category.objects.filter(is_active=True):
        categories.append({
            'url': f'/rfid-products?category={category.id}',
            'priority': '0.8',
            'changefreq': 'weekly',
            'lastmod': current_date
        })
    
    # Products
    products = []
    for product in Product.objects.filter(is_active=True):
        products.append({
            'url': f'/product/{product.id}',
            'priority': '0.7',
            'changefreq': 'weekly',
            'lastmod': product.updated_at.strftime('%Y-%m-%d') if product.updated_at else current_date
        })
    
    return JsonResponse({
        'static_pages': static_pages,
        'categories': categories,
        'products': products,
        'last_generated': current_date
    })

# Thêm vào urls.py
# path('api/sitemap-data/', sitemap_data, name='sitemap_data'),
