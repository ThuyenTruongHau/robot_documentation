from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SolutionViewSet, SolutionImageViewSet

router = DefaultRouter()
router.register(r'solutions', SolutionViewSet, basename='solution')
router.register(r'images', SolutionImageViewSet, basename='solutionImage')

urlpatterns = [
    path('', include(router.urls)),
]

