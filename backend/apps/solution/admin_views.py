from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Solution, SolutionImage
from .forms import SolutionForm, SolutionImageForm


@login_required(login_url='/auth/login/')
def solution_list(request):
    """Danh sách solutions với tìm kiếm và phân trang"""
    search_query = request.GET.get('search', '')
    
    solutions = Solution.objects.all().order_by('-created_at')
    
    if search_query:
        solutions = solutions.filter(
            Q(solution_name__icontains=search_query) | 
            Q(description__icontains=search_query)
        )
    
    paginator = Paginator(solutions, 10)  # 10 items per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'search_query': search_query,
        'total_count': solutions.count(),
    }
    return render(request, 'admin/solution_list.html', context)


@login_required(login_url='/auth/login/')
def solution_create(request):
    """Tạo solution mới"""
    if request.method == 'POST':
        form = SolutionForm(request.POST)
        if form.is_valid():
            solution = form.save()
            messages.success(request, 'Solution đã được tạo thành công!')
            return redirect('manage_solution:solution_detail', pk=solution.pk)
    else:
        form = SolutionForm()
    
    return render(request, 'admin/solution_form.html', {
        'form': form,
        'solution': None,
        'title': 'Tạo Solution Mới',
        'action': 'create'
    })


@login_required(login_url='/auth/login/')
def solution_edit(request, pk):
    """Chỉnh sửa solution"""
    solution = get_object_or_404(Solution, pk=pk)
    
    if request.method == 'POST':
        form = SolutionForm(request.POST, instance=solution)
        if form.is_valid():
            form.save()
            messages.success(request, 'Solution đã được cập nhật thành công!')
            return redirect('manage_solution:solution_detail', pk=solution.pk)
    else:
        form = SolutionForm(instance=solution)
    
    return render(request, 'admin/solution_form.html', {
        'form': form,
        'solution': solution,
        'title': 'Chỉnh sửa Solution',
        'action': 'edit'
    })


@login_required(login_url='/auth/login/')
def solution_delete(request, pk):
    """Xóa solution"""
    solution = get_object_or_404(Solution, pk=pk)
    
    if request.method == 'POST':
        solution_name = solution.solution_name
        solution.delete()
        messages.success(request, f'Solution "{solution_name}" đã được xóa thành công!')
        return redirect('manage_solution:solution_list')
    
    return redirect('manage_solution:solution_list')


@login_required(login_url='/auth/login/')
def solution_detail(request, pk):
    """Chi tiết solution"""
    solution = get_object_or_404(Solution, pk=pk)
    images = solution.images.all()
    
    context = {
        'solution': solution,
        'images': images,
        'images_count': images.count(),
    }
    return render(request, 'admin/solution_detail.html', context)


@login_required(login_url='/auth/login/')
def solution_image_add(request, solution_pk):
    """Thêm nhiều hình ảnh cho solution"""
    solution = get_object_or_404(Solution, pk=solution_pk)
    
    if request.method == 'POST':
        form = SolutionImageForm()
        images = request.FILES.getlist('images')
        
        if not images:
            messages.warning(request, 'Vui lòng chọn ít nhất một hình ảnh!')
            return redirect('manage_solution:solution_image_add', solution_pk=solution.pk)
        
        try:
            # Validate images
            SolutionImageForm.validate_images(images)
            
            # Save all images
            count = 0
            for image_file in images:
                SolutionImage.objects.create(
                    solution=solution,
                    image=image_file
                )
                count += 1
            
            messages.success(request, f'Đã thêm {count} hình ảnh thành công!')
            return redirect('manage_solution:solution_detail', pk=solution.pk)
        except Exception as e:
            messages.error(request, str(e))
            return redirect('manage_solution:solution_image_add', solution_pk=solution.pk)
    else:
        form = SolutionImageForm()
    
    return render(request, 'admin/solution_image_form.html', {
        'form': form,
        'solution': solution,
        'title': 'Thêm Hình Ảnh'
    })


@login_required(login_url='/auth/login/')
def solution_image_delete(request, pk):
    """Xóa hình ảnh của solution"""
    image = get_object_or_404(SolutionImage, pk=pk)
    solution = image.solution
    
    if request.method == 'POST':
        image.delete()
        messages.success(request, 'Hình ảnh đã được xóa thành công!')
        return redirect('manage_solution:solution_detail', pk=solution.pk)
    
    return redirect('manage_solution:solution_detail', pk=solution.pk)

