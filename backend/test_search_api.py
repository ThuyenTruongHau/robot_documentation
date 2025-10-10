#!/usr/bin/env python
"""
Script test cho Real-time Search API
Chạy script này để kiểm tra API endpoints hoạt động đúng
"""

import os
import sys
import django
import requests
from django.conf import settings

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def test_category_search():
    """Test category search API"""
    print("🔍 Testing Category Search API...")
    
    # Test với query rỗng
    response = requests.get('http://localhost:9000/api/categories/search/?q=')
    print(f"Empty query: {response.status_code}")
    
    # Test với query có ký tự
    response = requests.get('http://localhost:9000/api/categories/search/?q=test')
    print(f"Test query: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Results count: {data.get('count', 0)}")
        print(f"Results: {len(data.get('results', []))}")
    else:
        print(f"Error: {response.text}")

def test_product_search():
    """Test product search API"""
    print("\n🔍 Testing Product Search API...")
    
    # Test với query rỗng
    response = requests.get('http://localhost:9000/api/products/search/?q=')
    print(f"Empty query: {response.status_code}")
    
    # Test với query có ký tự
    response = requests.get('http://localhost:9000/api/products/search/?q=test')
    print(f"Test query: {response.status_code}")
    
    # Test với category filter
    response = requests.get('http://localhost:9000/api/products/search/?q=test&category=1')
    print(f"Test query with category: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"Results count: {data.get('count', 0)}")
        print(f"Results: {len(data.get('results', []))}")
    else:
        print(f"Error: {response.text}")

def test_server_running():
    """Kiểm tra server có đang chạy không"""
    try:
        response = requests.get('http://localhost:9000/', timeout=5)
        return True
    except requests.exceptions.RequestException:
        return False

if __name__ == '__main__':
    print("🚀 Testing Real-time Search API")
    print("=" * 50)
    
    if not test_server_running():
        print("❌ Server không chạy. Hãy chạy: python manage.py runserver")
        sys.exit(1)
    
    print("✅ Server đang chạy")
    
    try:
        test_category_search()
        test_product_search()
        print("\n✅ Tất cả tests đã hoàn thành!")
        print("\n📝 Hướng dẫn sử dụng:")
        print("1. Vào http://localhost:9000/manage/categories/ để test category search")
        print("2. Vào http://localhost:9000/manage/products/ để test product search")
        print("3. Gõ từ khóa vào ô tìm kiếm để xem kết quả real-time")
        
    except Exception as e:
        print(f"❌ Lỗi: {e}")
        sys.exit(1)
