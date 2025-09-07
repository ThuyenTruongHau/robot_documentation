from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Q
from django.contrib.auth import get_user_model
from .models import SystemSettings, UserProfile
from .forms import UserForm, UserProfileForm, SystemSettingsForm

User = get_user_model()


@login_required(login_url='/auth/login/')
def user_list(request):
    """Danh sách users với tìm kiếm và phân trang"""
    search_query = request.GET.get('search', '')
    role_filter = request.GET.get('role', '')
    
    users = User.objects.select_related('profile').all().order_by('-date_joined')
    
    if search_query:
        users = users.filter(
            Q(username__icontains=search_query) | 
            Q(email__icontains=search_query) |
            Q(first_name__icontains=search_query) |
            Q(last_name__icontains=search_query)
        )
    
    if role_filter:
        users = users.filter(profile__role=role_filter)
    
    paginator = Paginator(users, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'search_query': search_query,
        'role_filter': role_filter,
        'role_choices': UserProfile.ROLE_CHOICES,
        'total_count': users.count(),
    }
    return render(request, 'admin/user_list.html', context)


@login_required(login_url='/auth/login/')
def user_create(request):
    """Tạo user mới"""
    if request.method == 'POST':
        form = UserForm(request.POST)
        profile_form = UserProfileForm(request.POST)
        
        if form.is_valid() and profile_form.is_valid():
            user = form.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            
            messages.success(request, f'User "{user.username}" đã được tạo thành công!')
            return redirect('manage_core:user_list')
    else:
        form = UserForm()
        profile_form = UserProfileForm()
    
    return render(request, 'admin/user_form.html', {
        'form': form,
        'profile_form': profile_form,
        'title': 'Tạo User Mới',
        'action': 'create'
    })


@login_required(login_url='/auth/login/')
def user_edit(request, pk):
    """Chỉnh sửa user"""
    user = get_object_or_404(User, pk=pk)
    profile, created = UserProfile.objects.get_or_create(user=user)
    
    if request.method == 'POST':
        form = UserForm(request.POST, instance=user)
        profile_form = UserProfileForm(request.POST, instance=profile)
        
        if form.is_valid() and profile_form.is_valid():
            form.save()
            profile_form.save()
            
            messages.success(request, f'User "{user.username}" đã được cập nhật thành công!')
            return redirect('manage_core:user_detail', pk=user.pk)
    else:
        form = UserForm(instance=user)
        profile_form = UserProfileForm(instance=profile)
    
    return render(request, 'admin/user_form.html', {
        'form': form,
        'profile_form': profile_form,
        'user': user,
        'title': 'Chỉnh sửa User',
        'action': 'edit'
    })


@login_required(login_url='/auth/login/')
def user_detail(request, pk):
    """Chi tiết user"""
    user = get_object_or_404(User.objects.select_related('profile'), pk=pk)
    profile = getattr(user, 'profile', None)
    
    context = {
        'user': user,
        'profile': profile,
    }
    return render(request, 'admin/user_detail.html', context)


@login_required(login_url='/auth/login/')
def user_delete(request, pk):
    """Xóa user"""
    user = get_object_or_404(User, pk=pk)
    
    if request.method == 'POST':
        username = user.username
        user.delete()
        messages.success(request, f'User "{username}" đã được xóa thành công!')
        return redirect('manage_core:user_list')
    
    return render(request, 'admin/user_confirm_delete.html', {
        'user': user
    })


@login_required(login_url='/auth/login/')
def user_profile(request):
    """Quản lý thông tin tài khoản cá nhân"""
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)
    
    if request.method == 'POST':
        form = UserForm(request.POST, instance=user)
        profile_form = UserProfileForm(request.POST, instance=profile)
        
        if form.is_valid() and profile_form.is_valid():
            form.save()
            profile_form.save()
            messages.success(request, 'Thông tin tài khoản đã được cập nhật thành công!')
            return redirect('manage_core:user_profile')
    else:
        form = UserForm(instance=user)
        profile_form = UserProfileForm(instance=profile)
    
    context = {
        'form': form,
        'profile_form': profile_form,
        'user': user,
        'profile': profile,
    }
    return render(request, 'admin/user_profile.html', context)
