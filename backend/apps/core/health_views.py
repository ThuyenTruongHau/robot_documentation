"""
Health Check Views
Provides system health status without authentication
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.core.cache import cache
from django.conf import settings
import datetime
import platform
import os

# Optional import for system monitoring
try:
    import psutil
    PSUTIL_AVAILABLE = True
except ImportError:
    PSUTIL_AVAILABLE = False


class HealthCheckView(APIView):
    """
    Health check endpoint that returns system status
    No authentication required
    """
    permission_classes = []  # No authentication required
    authentication_classes = []  # No authentication required

    def get(self, request):
        """Get system health status"""
        try:
            # Basic system info
            health_data = {
                "status": "healthy",
                "timestamp": datetime.datetime.now().isoformat(),
                "service": "Thado RFID API",
                "version": "1.0.0",
                "environment": "production" if not settings.DEBUG else "development",
                "python_version": platform.python_version(),
                "django_version": settings.DJANGO_VERSION if hasattr(settings, 'DJANGO_VERSION') else "4.2.16",
            }

            # Database health check
            try:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT 1")
                    health_data["database"] = {
                        "status": "connected",
                        "engine": settings.DATABASES['default']['ENGINE'].split('.')[-1]
                    }
            except Exception as e:
                health_data["database"] = {
                    "status": "error",
                    "error": str(e)
                }
                health_data["status"] = "unhealthy"

            # Cache health check (if Redis is configured)
            try:
                cache.set('health_check', 'ok', 10)
                cache_result = cache.get('health_check')
                if cache_result == 'ok':
                    health_data["cache"] = {
                        "status": "connected",
                        "backend": getattr(settings, 'CACHES', {}).get('default', {}).get('BACKEND', 'default')
                    }
                else:
                    health_data["cache"] = {"status": "error"}
            except Exception as e:
                health_data["cache"] = {
                    "status": "error",
                    "error": str(e)
                }

            # System resources (if psutil is available)
            if PSUTIL_AVAILABLE:
                try:
                    health_data["system"] = {
                        "cpu_percent": psutil.cpu_percent(interval=1),
                        "memory_percent": psutil.virtual_memory().percent,
                        "disk_percent": psutil.disk_usage('/').percent if os.name != 'nt' else psutil.disk_usage('C:').percent
                    }
                except Exception as e:
                    health_data["system"] = {
                        "status": "error",
                        "error": str(e)
                    }
            else:
                health_data["system"] = {
                    "status": "psutil not available",
                    "note": "Install psutil for system monitoring"
                }

            # API endpoints status
            health_data["endpoints"] = {
                "api": "up",
                "admin": "up",
                "swagger": "up" if hasattr(settings, 'SWAGGER_SETTINGS') else "not configured"
            }

            # Determine overall status
            if health_data["database"]["status"] == "error":
                health_data["status"] = "unhealthy"
                return Response(health_data, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            
            return Response(health_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "status": "error",
                "timestamp": datetime.datetime.now().isoformat(),
                "error": str(e),
                "service": "Thado RFID API"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SimpleHealthCheckView(APIView):
    """
    Simple health check endpoint - just returns basic status
    No authentication required
    """
    permission_classes = []  # No authentication required
    authentication_classes = []  # No authentication required

    def get(self, request):
        """Get simple health status"""
        return Response({
            "status": "healthy",
            "timestamp": datetime.datetime.now().isoformat(),
            "service": "Thado RFID API",
            "version": "1.0.0"
        }, status=status.HTTP_200_OK)


class ReadinessCheckView(APIView):
    """
    Readiness check endpoint - checks if service is ready to accept traffic
    No authentication required
    """
    permission_classes = []  # No authentication required
    authentication_classes = []  # No authentication required

    def get(self, request):
        """Check if service is ready"""
        try:
            # Check database connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            
            return Response({
                "status": "ready",
                "timestamp": datetime.datetime.now().isoformat(),
                "service": "Thado RFID API"
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                "status": "not ready",
                "timestamp": datetime.datetime.now().isoformat(),
                "error": str(e),
                "service": "Thado RFID API"
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)


class LivenessCheckView(APIView):
    """
    Liveness check endpoint - checks if service is alive
    No authentication required
    """
    permission_classes = []  # No authentication required
    authentication_classes = []  # No authentication required

    def get(self, request):
        """Check if service is alive"""
        return Response({
            "status": "alive",
            "timestamp": datetime.datetime.now().isoformat(),
            "service": "Thado RFID API"
        }, status=status.HTTP_200_OK)
