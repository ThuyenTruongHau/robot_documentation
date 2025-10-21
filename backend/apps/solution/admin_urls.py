from django.urls import path
from . import admin_views

app_name = 'manage_solution'

urlpatterns = [
    path('solutions/', admin_views.solution_list, name='solution_list'),
    path('solutions/create/', admin_views.solution_create, name='solution_create'),
    path('solutions/<int:pk>/', admin_views.solution_detail, name='solution_detail'),
    path('solutions/<int:pk>/edit/', admin_views.solution_edit, name='solution_edit'),
    path('solutions/<int:pk>/delete/', admin_views.solution_delete, name='solution_delete'),
    path('solutions/<int:solution_pk>/images/add/', admin_views.solution_image_add, name='solution_image_add'),
    path('images/<int:pk>/delete/', admin_views.solution_image_delete, name='solution_image_delete'),
]

