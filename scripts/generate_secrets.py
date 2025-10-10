#!/usr/bin/env python3
"""
Script để tạo secret keys cho Django project
"""

import secrets
import string

def generate_secret_key(length=50):
    """Tạo secret key với độ dài tùy chỉnh"""
    return secrets.token_urlsafe(length)

def generate_password(length=16):
    """Tạo password mạnh"""
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(secrets.choice(characters) for _ in range(length))

def generate_api_key(length=32):
    """Tạo API key"""
    return secrets.token_hex(length)

if __name__ == "__main__":
    print("🔐 Thado Robot - Secret Key Generator")
    print("=" * 50)
    
    # Django Secret Key
    django_secret = generate_secret_key(50)
    print(f"SECRET_KEY={django_secret}")
    
    # JWT Secret Key
    jwt_secret = generate_secret_key(50)
    print(f"JWT_SECRET_KEY={jwt_secret}")
    
    # API Key
    api_key = generate_api_key(32)
    print(f"API_KEY={api_key}")
    
    # Database Password
    db_password = generate_password(16)
    print(f"DB_PASSWORD={db_password}")
    
    print("\n💡 Hướng dẫn sử dụng:")
    print("1. Copy các key trên vào file .env")
    print("2. Đảm bảo file .env không được commit lên git")
    print("3. Mỗi môi trường (dev, staging, prod) nên có secret key khác nhau")
    print("4. Thay đổi secret key định kỳ để bảo mật")
    
    print("\n⚠️  Lưu ý bảo mật:")
    print("- Không bao giờ commit secret key lên git")
    print("- Sử dụng biến môi trường trong production")
    print("- Backup secret key an toàn")
    print("- Rotate keys định kỳ")
