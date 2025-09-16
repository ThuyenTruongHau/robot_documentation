# apps/product/serializers.py
from rest_framework import serializers
from .models import Product, ProductImage
from apps.category.models import Category

class CategoryInPorductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "product", "image"]

    def update(self, instance, validated_data):
        if "image" in validated_data:
            new_image = validated_data.get("image")
            if new_image:  
                # Có ảnh mới => xóa ảnh cũ
                if instance.image:
                    instance.image.delete(save=False)
            else:
                # Client gửi null => giữ ảnh cũ
                validated_data.pop("image")

        return super().update(instance, validated_data)

class ProductSerializer(serializers.ModelSerializer):
    # Hiển thị thông tin category chi tiết
    category = CategoryInPorductSerializer(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    # Cho phép gán category bằng id khi tạo/sửa product
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "parameters",
            "category",
            "category_id",
            "category_name",
            "images",
            "created_at",
            "updated_at",
        ]

