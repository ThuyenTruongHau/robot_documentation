#!/usr/bin/env python
"""
Script test URL patterns cho Real-time Search
"""

import os
import sys
import django
from django.conf import settings
from django.urls import reverse

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def test_url_patterns():
    """Test URL patterns"""
    print("🔗 Testing URL Patterns...")
    
    try:
        # Test category URLs
        category_list_url = reverse('manage_category:category_list')
        print(f"✅ Category list URL: {category_list_url}")
        
        category_detail_url = reverse('manage_category:category_detail', kwargs={'pk': 1})
        print(f"✅ Category detail URL: {category_detail_url}")
        
        # Test product URLs
        product_list_url = reverse('manage_product:product_list')
        print(f"✅ Product list URL: {product_list_url}")
        
        product_detail_url = reverse('manage_product:product_detail', kwargs={'pk': 1})
        print(f"✅ Product detail URL: {product_detail_url}")
        
        print("\n📝 URLs sẽ được sử dụng trong JavaScript:")
        print(f"- Category detail: /manage/categories/{{id}}/")
        print(f"- Product detail: /manage/products/{{id}}/")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    print("🚀 Testing URL Patterns for Real-time Search")
    print("=" * 50)
    
    try:
        test_url_patterns()
        print("\n✅ URL patterns test completed!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
