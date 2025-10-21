from django import forms
from django.core.exceptions import ValidationError
import json
import os
from .models import Solution, SolutionImage


class SolutionForm(forms.ModelForm):
    """Form cho Solution"""
    
    class Meta:
        model = Solution
        fields = ['solution_name', 'description', 'detail']
        widgets = {
            'solution_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập tên solution...'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Nhập mô tả solution...'
            }),
            'detail': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Nhập chi tiết kỹ thuật (JSON format)...'
            })
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['solution_name'].required = True
        self.fields['description'].required = False
        self.fields['detail'].required = False
    
    def clean_detail(self):
        """Validate detail field"""
        detail = self.cleaned_data.get('detail')
        
        # If detail is empty or None, that's fine
        if not detail:
            return detail
        
        # If detail is a string, try to parse it as JSON
        if isinstance(detail, str):
            try:
                detail = json.loads(detail)
            except json.JSONDecodeError:
                raise ValidationError('Định dạng JSON không hợp lệ cho chi tiết kỹ thuật.')
        
        # Validate the structure of detail
        if isinstance(detail, dict):
            errors = []
            
            for section_name, section_data in detail.items():
                # Check if section name is empty
                if not section_name or not section_name.strip():
                    errors.append('Tên tiêu đề không được để trống.')
                    continue
                
                # Check if section data is a dictionary
                if not isinstance(section_data, dict):
                    errors.append(f'Dữ liệu tiêu đề "{section_name}" không hợp lệ.')
                    continue
                
                # Check if section has parameters
                if not section_data:
                    errors.append(f'Tiêu đề "{section_name}" cần có ít nhất 1 thông số.')
                    continue
                
                # Check each parameter in the section
                for param_name, param_value in section_data.items():
                    # Check if parameter name is empty
                    if not param_name or not param_name.strip():
                        errors.append(f'Tiêu đề "{section_name}" có thông số thiếu tên.')
                        continue
                    
                    # Check if parameter value is empty
                    if not param_value or not param_value.strip():
                        errors.append(f'Thông số "{param_name}" trong tiêu đề "{section_name}" thiếu giá trị.')
                        continue
            
            # If there are validation errors, raise them
            if errors:
                raise ValidationError(errors)
        
        return detail


class SolutionImageForm(forms.Form):
    """Form cho SolutionImage với multi-upload support"""
    
    # No form fields - we handle files directly in the view
    
    def clean(self):
        """Validate image files from request.FILES"""
        cleaned_data = super().clean()
        return cleaned_data
    
    @staticmethod
    def validate_images(files):
        """Static method to validate uploaded images"""
        if not files:
            return []
        
        allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
        max_file_size = 10 * 1024 * 1024  # 10MB
        errors = []
        
        for image in files:
            # Check file extension
            ext = os.path.splitext(image.name)[1].lower()
            if ext not in allowed_extensions:
                errors.append(
                    f'Định dạng file "{image.name}" không được hỗ trợ. Chỉ chấp nhận: {", ".join(allowed_extensions)}'
                )
            
            # Check file size
            if image.size > max_file_size:
                errors.append(
                    f'File "{image.name}" có kích thước vượt quá 10MB.'
                )
        
        if errors:
            raise ValidationError(errors)
        
        return files

