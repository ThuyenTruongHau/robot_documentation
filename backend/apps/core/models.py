from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class SystemSettings(models.Model):
    """Model để lưu trữ cài đặt hệ thống"""
    key = models.CharField(max_length=100, unique=True, verbose_name="Khóa cài đặt")
    value = models.TextField(verbose_name="Giá trị")
    description = models.TextField(blank=True, null=True, verbose_name="Mô tả")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Cài đặt hệ thống"
        verbose_name_plural = "Cài đặt hệ thống"
        ordering = ['key']

    def __str__(self):
        return f"{self.key}: {self.value[:50]}"


class UserProfile(models.Model):
    """Mở rộng thông tin user"""
    ROLE_CHOICES = [
        ('admin', 'Quản trị viên'),
        ('manager', 'Quản lý'),
        ('staff', 'Nhân viên'),
        ('viewer', 'Người xem'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='staff', verbose_name="Vai trò")
    department = models.CharField(max_length=100, blank=True, null=True, verbose_name="Phòng ban")
    phone = models.CharField(max_length=15, blank=True, null=True, verbose_name="Số điện thoại")
    address = models.TextField(blank=True, null=True, verbose_name="Địa chỉ")
    notes = models.TextField(blank=True, null=True, verbose_name="Ghi chú")
    is_active = models.BooleanField(default=True, verbose_name="Hoạt động")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hồ sơ người dùng"
        verbose_name_plural = "Hồ sơ người dùng"

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.get_role_display()})"
