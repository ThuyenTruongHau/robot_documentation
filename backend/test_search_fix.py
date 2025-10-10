#!/usr/bin/env python
"""
Test script để kiểm tra Real-time Search đã hoạt động đúng chưa
"""

import os
import sys
import django
import requests
from django.conf import settings

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def test_server():
    """Kiểm tra server có chạy không"""
    try:
        response = requests.get('http://localhost:9000/', timeout=5)
        return True
    except requests.exceptions.RequestException:
        return False

def test_templates():
    """Kiểm tra templates có load được không"""
    print("🔍 Testing Templates...")
    
    # Test category list page
    try:
        response = requests.get('http://localhost:9000/manage/categories/')
        if response.status_code == 200:
            print("✅ Category list page loads successfully")
        else:
            print(f"❌ Category list page error: {response.status_code}")
    except Exception as e:
        print(f"❌ Category list page error: {e}")
    
    # Test product list page
    try:
        response = requests.get('http://localhost:9000/manage/products/')
        if response.status_code == 200:
            print("✅ Product list page loads successfully")
        else:
            print(f"❌ Product list page error: {response.status_code}")
    except Exception as e:
        print(f"❌ Product list page error: {e}")

def test_api_endpoints():
    """Kiểm tra API endpoints"""
    print("\n🔍 Testing API Endpoints...")
    
    # Test category search API
    try:
        response = requests.get('http://localhost:9000/api/categories/search/?q=test')
        if response.status_code == 200:
            print("✅ Category search API works")
        else:
            print(f"❌ Category search API error: {response.status_code}")
    except Exception as e:
        print(f"❌ Category search API error: {e}")
    
    # Test product search API
    try:
        response = requests.get('http://localhost:9000/api/products/search/?q=test')
        if response.status_code == 200:
            print("✅ Product search API works")
        else:
            print(f"❌ Product search API error: {response.status_code}")
    except Exception as e:
        print(f"❌ Product search API error: {e}")

def test_static_files():
    """Kiểm tra static files"""
    print("\n🔍 Testing Static Files...")
    
    js_files = [
        '/static/js/realtime-search.js',
        '/static/js/category-search.js',
        '/static/js/product-search.js'
    ]
    
    for js_file in js_files:
        try:
            response = requests.get(f'http://localhost:9000{js_file}')
            if response.status_code == 200:
                print(f"✅ {js_file} loads successfully")
            else:
                print(f"❌ {js_file} error: {response.status_code}")
        except Exception as e:
            print(f"❌ {js_file} error: {e}")

if __name__ == '__main__':
    print("🚀 Testing Real-time Search Fix")
    print("=" * 50)
    
    if not test_server():
        print("❌ Server không chạy. Hãy chạy: python manage.py runserver")
        sys.exit(1)
    
    print("✅ Server đang chạy")
    
    try:
        test_templates()
        test_api_endpoints()
        test_static_files()
        
        print("\n✅ Tất cả tests đã hoàn thành!")
        print("\n📝 Hướng dẫn sử dụng:")
        print("1. Vào http://localhost:9000/manage/categories/")
        print("2. Gõ từ khóa vào ô tìm kiếm")
        print("3. Click vào kết quả để xem chi tiết")
        print("4. Làm tương tự với products tại /manage/products/")
        
    except Exception as e:
        print(f"❌ Lỗi: {e}")
        sys.exit(1)
