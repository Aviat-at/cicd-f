# pylint: disable=no-member
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.permissions import IsAuthenticated


class NotificationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Notification instances.

    Provides CRUD operations for notifications, allowing authenticated users 
    to create, retrieve, update, and delete notifications. Each user can only 
    access their own notifications, ordered by creation date in descending order.

    Includes custom actions for:
        - Marking a specific notification as read or unread.
        - Marking all notifications as read.
        - Listing unread notifications.
        - Retrieving the 5 most recent notifications.
        - Deleting all notifications for the user.
    
    Attributes:
        queryset (QuerySet): The base queryset for retrieving Notification records, 
                             ordered by `created_at` in descending order.
        serializer_class (Serializer): The serializer used to validate and 
                                       serialize Notification data.
        permission_classes (list): Restricts access to authenticated users only.
    """

    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns the queryset of notifications for the authenticated user.

        Overrides the default `get_queryset` method to filter notifications 
        so that users can only access their own notifications.

        Returns:
            QuerySet: A queryset of Notification objects belonging to the current user.
        """
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Assigns the authenticated user to the notification being created.

        Overrides the default `perform_create` method to ensure the `user`
        field is automatically set to the authenticated user.

        Args:
            serializer (Serializer): The serializer instance with validated data.
        """
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], url_path='mark-read')
    def mark_as_read(self, request, pk=None):
        """
        Marks a specific notification as read.

        Args:
            request (Request): The HTTP request object.
            pk (int): The primary key of the notification to mark as read.

        Returns:
            Response: A success message or an error message if the notification is not found.
        """
        try:
            notification = Notification.objects.get(pk=pk, user=self.request.user)
            notification.is_read = True
            notification.save()
            return Response({'message': 'Notification marked as read'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_as_read(self, request):
        """
        Marks all unread notifications for the authenticated user as read.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: A success message indicating the number of notifications marked as read.
        """
        notifications = Notification.objects.filter(user=self.request.user, is_read=False)
        count = notifications.update(is_read=True)
        return Response({'message': f'All {count} notifications marked as read'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='unread')
    def unread_notifications(self, request):
        """
        Retrieves all unread notifications for the authenticated user.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: A list of unread notifications.
        """
        notifications = Notification.objects.filter(user=self.request.user, is_read=False)
        serializer = self.get_serializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='mark-unread')
    def mark_as_unread(self, request, pk=None):
        """
        Marks a specific notification as unread.

        Args:
            request (Request): The HTTP request object.
            pk (int): The primary key of the notification to mark as unread.

        Returns:
            Response: A success message or an error message if the notification is not found.
        """
        try:
            notification = Notification.objects.get(pk=pk, user=self.request.user)
            notification.is_read = False
            notification.save()
            return Response({'message': 'Notification marked as unread'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['delete'], url_path='delete-all')
    def delete_all_notifications(self, request):
        """
        Deletes all notifications for the authenticated user.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: A success message indicating the number of notifications deleted.
        """
        count = Notification.objects.filter(user=self.request.user).delete()[0]
        return Response({'message': f'All {count} notifications deleted'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='recent')
    def recent_notifications(self, request):
        """
        Retrieves the 5 most recent notifications for the authenticated user.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: A list of the 5 most recent notifications.
        """
        notifications = Notification.objects.filter(user=self.request.user).order_by('-created_at')[:5]
        serializer = self.get_serializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
