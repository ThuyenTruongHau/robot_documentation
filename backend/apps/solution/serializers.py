from rest_framework import serializers
from .models import Solution, SolutionImage


class SolutionImageSerializer(serializers.ModelSerializer):
    """Serializer cho SolutionImage"""
    
    class Meta:
        model = SolutionImage
        fields = ['id', 'image', 'uploaded_at']


class SolutionSerializer(serializers.ModelSerializer):
    """Serializer cho Solution"""
    images = SolutionImageSerializer(many=True, read_only=True)
    images_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Solution
        fields = [
            'id',
            'solution_name',
            'description',
            'detail',
            'images',
            'images_count',
            'created_at',
            'updated_at'
        ]
    
    def get_images_count(self, obj):
        """Lấy số lượng images"""
        return obj.images.count()


class SolutionListSerializer(serializers.ModelSerializer):
    """Serializer cho danh sách Solutions (không bao gồm detail đầy đủ)"""
    images_count = serializers.SerializerMethodField()
    first_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Solution
        fields = [
            'id',
            'solution_name',
            'description',
            'first_image',
            'images_count',
            'created_at',
            'updated_at'
        ]
    
    def get_images_count(self, obj):
        """Lấy số lượng images"""
        return obj.images.count()
    
    def get_first_image(self, obj):
        """Lấy ảnh đầu tiên"""
        first_image = obj.images.first()
        if first_image:
            return SolutionImageSerializer(first_image).data
        return None

