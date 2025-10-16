"""
Ultra Simple Health Check Views
No external dependencies, maximum stability
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import datetime


class UltraSimpleHealthCheckView(APIView):
    """
    Ultra simple health check - just returns basic status
    No authentication required, no external dependencies
    """
    permission_classes = []  # No authentication required
    authentication_classes = []  # No authentication required

    def get(self, request):
        """Get ultra simple health status"""
        return Response({
            "status": "healthy",
            "timestamp": datetime.datetime.now().isoformat(),
            "service": "Thado RFID API",
            "version": "1.0.0",
            "message": "Service is running"
        }, status=status.HTTP_200_OK)


class PingView(APIView):
    """
    Simple ping endpoint
    No authentication required
    """
    permission_classes = []  # No authentication required
    authentication_classes = []  # No authentication required

    def get(self, request):
        """Simple ping response"""
        return Response({
            "pong": True,
            "timestamp": datetime.datetime.now().isoformat()
        }, status=status.HTTP_200_OK)
