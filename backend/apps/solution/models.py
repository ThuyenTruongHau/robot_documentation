# apps/solution/models.py
from django.db import models
import os, uuid


def solution_image_path(instance, filename):
    ext = os.path.splitext(filename)[1]
    return f"solutions/{uuid.uuid4().hex}{ext}"


class Solution(models.Model):
    solution_name = models.CharField(max_length=200, verbose_name="Solution Name")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    detail = models.JSONField(blank=True, null=True, verbose_name="Detail Specifications")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.solution_name
    
    class Meta:
        verbose_name = "Solution"
        verbose_name_plural = "Solutions"
        ordering = ['-created_at']


class SolutionImage(models.Model):
    solution = models.ForeignKey(
        Solution,
        on_delete=models.CASCADE,
        related_name="images"
    )
    image = models.ImageField(upload_to=solution_image_path, blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image of {self.solution.solution_name}"
    
    class Meta:
        verbose_name = "Solution Image"
        verbose_name_plural = "Solution Images"
        ordering = ['uploaded_at']

