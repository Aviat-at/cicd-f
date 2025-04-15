from django.contrib import admin
from .models import Department

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    """Department Admin"""
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
