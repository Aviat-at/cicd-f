# departments/views.py
# pylint: disable=no-member
from rest_framework.decorators import action
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Department
from .serializers import DepartmentSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing department instances.
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Custom Actions

    @action(detail=False, methods=['get'], url_path='recent', name='department-recent')
    def recent_departments(self, request):
        """Get the most recently added departments."""
        recent_departments = self.queryset.order_by('-created_at')[:5]
        serializer = self.get_serializer(recent_departments, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='count', name='department-count')
    def count_departments(self, request):
        """Get the total count of departments."""
        count = self.queryset.count()
        return Response({'count': count})

    @action(detail=False, methods=['get'], url_path='search', name='department-search')
    def search_departments(self, request):
        """Search for departments by name."""
        name_query = request.query_params.get('name', None)
        if name_query:
            results = self.queryset.filter(name__icontains=name_query)
            serializer = self.get_serializer(results, many=True)
            return Response(serializer.data)
        return Response({'error': 'No search query provided'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='details', name='department-details')
    def department_details(self, request, pk=None):
        """Get detailed information for a single department."""
        department = self.get_object()
        serializer = self.get_serializer(department)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'], url_path='update-description', name='department-update-description')
    def update_description(self, request, pk=None):
        """Update the description of a department."""
        department = self.get_object()
        description = request.data.get('description', None)
        if description:
            department.description = description
            department.save()
            return Response({'message': 'Description updated successfully'})
        return Response({'error': 'No description provided'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='soft-delete', name='department-soft-delete')
    def soft_delete_department(self, request, pk=None):
        """Soft delete a department by setting its name to 'DELETED'."""
        department = self.get_object()
        department.name = 'DELETED'
        department.save()
        return Response({'message': 'Department soft deleted successfully'})
