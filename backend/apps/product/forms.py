from django import forms
from .models import Product, ProductImage
from apps.category.models import Category


class ProductForm(forms.ModelForm):
    """Form cho Product"""
    
    class Meta:
        model = Product
        fields = ['name', 'description', 'parameters', 'category']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nhập tên sản phẩm...'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Nhập mô tả sản phẩm...'
            }),
            'parameters': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Nhập thông số kỹ thuật (JSON format)...'
            }),
            'category': forms.Select(attrs={
                'class': 'form-control'
            })
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].required = True
        self.fields['category'].required = True
        self.fields['description'].required = False
        self.fields['parameters'].required = False
        
        # Populate category choices
        self.fields['category'].queryset = Category.objects.all()
        self.fields['category'].empty_label = "Chọn category..."


class ProductImageForm(forms.ModelForm):
    """Form cho ProductImage"""
    
    class Meta:
        model = ProductImage
        fields = ['image']
        widgets = {
            'image': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': 'image/*'
            })
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['image'].required = True
