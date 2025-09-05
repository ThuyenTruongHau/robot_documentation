# core/middlewares.py
import time
from django.utils.deprecation import MiddlewareMixin
from .logger import logger

class RequestLoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.start_time = time.time()
        user = getattr(request, "user", None)
        user_info = user.username if user and user.is_authenticated else "Anonymous"

        logger.info(f"[REQUEST] {request.method} {request.get_full_path()} by {user_info}")

    def process_response(self, request, response):
        duration = None
        if hasattr(request, "start_time"):
            duration = round(time.time() - request.start_time, 3)

        logger.info(
            f"[RESPONSE] {request.method} {request.get_full_path()} "
            f"status={response.status_code} "
            f"duration={duration}s"
        )
        return response

    def process_exception(self, request, exception):
        logger.error(
            f"[EXCEPTION] {request.method} {request.get_full_path()} "
            f"error={str(exception)}"
        )
