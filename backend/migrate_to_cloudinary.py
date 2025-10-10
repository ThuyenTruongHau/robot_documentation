import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.product.models import Product, ProductImage
from apps.category.models import Category
from apps.brand.models import Brand
from django.core.files import File
from django.conf import settings

def migrate_images():
    """Migrate tất cả images từ local lên Cloudinary"""
    
    print("Migrating Category images...")
    for category in Category.objects.exclude(image=''):
        if category.image:
            # Tạo path đầy đủ từ MEDIA_ROOT
            local_path = os.path.join(settings.MEDIA_ROOT, category.image.name)
            
            if os.path.exists(local_path):
                try:
                    # Đọc file từ local
                    with open(local_path, 'rb') as f:
                        file_name = os.path.basename(category.image.name)
                        # Re-save sẽ tự động upload lên Cloudinary
                        category.image.save(file_name, File(f), save=True)
                    print(f"✓ Migrated: {category.name}")
                except Exception as e:
                    print(f"✗ Error migrating {category.name}: {e}")
            else:
                print(f"⚠ File not found: {local_path}")
    
    print("\nMigrating Brand images...")
    for brand in Brand.objects.exclude(image=''):
        if brand.image:
            local_path = os.path.join(settings.MEDIA_ROOT, brand.image.name)
            
            if os.path.exists(local_path):
                try:
                    with open(local_path, 'rb') as f:
                        file_name = os.path.basename(brand.image.name)
                        brand.image.save(file_name, File(f), save=True)
                    print(f"✓ Migrated: {brand.name}")
                except Exception as e:
                    print(f"✗ Error migrating {brand.name}: {e}")
            else:
                print(f"⚠ File not found: {local_path}")
    
    print("\nMigrating Product images...")
    for product_image in ProductImage.objects.exclude(image=''):
        if product_image.image:
            local_path = os.path.join(settings.MEDIA_ROOT, product_image.image.name)
            
            if os.path.exists(local_path):
                try:
                    with open(local_path, 'rb') as f:
                        file_name = os.path.basename(product_image.image.name)
                        product_image.image.save(file_name, File(f), save=True)
                    print(f"✓ Migrated: {product_image.product.name}")
                except Exception as e:
                    print(f"✗ Error migrating {product_image.product.name}: {e}")
            else:
                print(f"⚠ File not found: {local_path}")
    
    print("\n✅ Migration completed!")

if __name__ == '__main__':
    migrate_images()