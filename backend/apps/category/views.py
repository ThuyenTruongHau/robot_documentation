from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer
from rest_framework.permissions import IsAuthenticated


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet CRUD cho Category:
    - list (GET /categories/)
    - retrieve (GET /categories/{id}/)
    - create (POST /categories/)
    - update (PUT /categories/{id}/)
    - partial_update (PATCH /categories/{id}/)
    - destroy (DELETE /categories/{id}/)
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    #permission_classes = [IsAuthenticated]
