from rest_framework import serializers
from .models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    """DepartmentSerializer"""
    class Meta:
        """Meta"""
        model = Department
        fields = '__all__'
