from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import Solution, SolutionImage
from .serializers import (
    SolutionSerializer,
    SolutionListSerializer,
    SolutionImageSerializer
)


class SolutionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet cho Solution
    Chỉ cho phép đọc dữ liệu (GET requests)
    """
    queryset = Solution.objects.all().order_by('-created_at')
    
    def get_serializer_class(self):
        """Chọn serializer phù hợp"""
        if self.action == 'list':
            return SolutionListSerializer
        return SolutionSerializer
    
    def get_queryset(self):
        """Filter queryset theo search query"""
        queryset = Solution.objects.all().order_by('-created_at')
        search = self.request.query_params.get('search', None)
        
        if search:
            queryset = queryset.filter(
                Q(solution_name__icontains=search) |
                Q(description__icontains=search)
            )
        
        return queryset
    
    @action(detail=True, methods=['get'])
    def images(self, request, pk=None):
        """Lấy tất cả images của một solution"""
        solution = self.get_object()
        images = solution.images.all()
        serializer = SolutionImageSerializer(images, many=True)
        return Response(serializer.data)


class SolutionImageViewSet(viewsets.ModelViewSet):
    """
    ViewSet cho SolutionImage
    Cho phép đọc và xóa dữ liệu (GET, DELETE requests)
    """
    queryset = SolutionImage.objects.all().order_by('uploaded_at')
    serializer_class = SolutionImageSerializer
    
    def get_queryset(self):
        """Filter queryset theo solution_id"""
        queryset = SolutionImage.objects.all().order_by('uploaded_at')
        solution_id = self.request.query_params.get('solution', None)
        
        if solution_id:
            queryset = queryset.filter(solution_id=solution_id)
        
        return queryset
    
    def destroy(self, request, pk=None):
        """Xóa một SolutionImage"""
        try:
            image = get_object_or_404(SolutionImage, pk=pk)
            solution_id = image.solution.id
            image.delete()
            
            return Response({
                'success': True,
                'message': 'Hình ảnh đã được xóa thành công!',
                'solution_id': solution_id
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'message': f'Lỗi khi xóa hình ảnh: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)

