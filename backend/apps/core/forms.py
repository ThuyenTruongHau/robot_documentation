from django import forms
from django.contrib.auth import get_user_model
from .models import UserProfile, SystemSettings

User = get_user_model()


class UserForm(forms.ModelForm):
    """Form cho User"""
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'is_active', 'is_staff']
        widgets = {
            'username': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập username...'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập email...'
            }),
            'first_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập tên...'
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập họ...'
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
            'is_staff': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].required = True
        self.fields['email'].required = True


class UserProfileForm(forms.ModelForm):
    """Form cho UserProfile"""
    
    class Meta:
        model = UserProfile
        fields = ['role', 'department', 'phone', 'address', 'notes', 'is_active']
        widgets = {
            'role': forms.Select(attrs={
                'class': 'form-control'
            }),
            'department': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập phòng ban...'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập số điện thoại...'
            }),
            'address': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Nhập địa chỉ...'
            }),
            'notes': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Nhập ghi chú...'
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['role'].required = True


class SystemSettingsForm(forms.Form):
    """Form cho cài đặt hệ thống"""
    logo = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': 'image/*'
        }),
        help_text="Upload logo mới cho hệ thống"
    )
    
    site_name = forms.CharField(
        max_length=100,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Tên hệ thống...'
        }),
        help_text="Tên hiển thị của hệ thống"
    )
    
    site_description = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Mô tả hệ thống...'
        }),
        help_text="Mô tả ngắn về hệ thống"
    )
    
    primary_color = forms.CharField(
        max_length=7,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'type': 'color',
            'value': '#2563eb'
        }),
        help_text="Màu chủ đạo của giao diện"
    )
    
    secondary_color = forms.CharField(
        max_length=7,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'type': 'color',
            'value': '#64748b'
        }),
        help_text="Màu phụ của giao diện"
    )
