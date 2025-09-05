from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "image", "description", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

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
