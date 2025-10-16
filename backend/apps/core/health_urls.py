"""
Health Check URLs - Ultra Simple Version
No external dependencies, maximum stability
"""
from django.urls import path
from .simple_health_views import UltraSimpleHealthCheckView, PingView

urlpatterns = [
    # Ultra simple health check endpoint
    path('health/', UltraSimpleHealthCheckView.as_view(), name='health-check'),
    
    # Simple ping endpoint
    path('ping/', PingView.as_view(), name='ping'),
    
    # Alternative endpoints
    path('status/', UltraSimpleHealthCheckView.as_view(), name='status'),
]
