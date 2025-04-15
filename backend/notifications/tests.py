# pylint: disable=no-member
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from .models import Notification
from rest_framework_simplejwt.tokens import RefreshToken
import time


class NotificationTests(APITestCase):
    """
    Test suite for the Notification API, covering all CRUD operations and custom actions.
    """

    def setUp(self):
        """
        Set up the test environment by creating a test user, obtaining a JWT token, 
        and configuring the Authorization header for API requests.
        """
        # Create users
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.other_user = User.objects.create_user(username='otheruser', password='password456')

        # Obtain JWT token for the user
        self.client = APIClient()
        self.token = RefreshToken.for_user(self.user).access_token

        # Set Authorization header with JWT token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # URLs
        self.notification_url = reverse('notification-list')
        self.mark_all_read_url = reverse('notification-mark-all-as-read')
        self.unread_notifications_url = reverse('notification-unread-notifications')
        self.recent_notifications_url = reverse('notification-recent-notifications')
        self.delete_all_url = reverse('notification-delete-all-notifications')

    def test_create_notification(self):
        """
        Test the creation of a notification.
        """
        data = {
            'title': 'Test Notification',
            'message': 'This is a test notification'
        }
        response = self.client.post(self.notification_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Notification.objects.count(), 1)
        self.assertEqual(Notification.objects.first().title, 'Test Notification')

    def test_get_notifications(self):
        """
        Test retrieving a list of notifications for the authenticated user.
        """
        Notification.objects.create(user=self.user, title='Test Notification', message='This is a test notification')
        response = self.client.get(self.notification_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_mark_notification_as_read(self):
        """
        Test marking a specific notification as read.
        """
        notification = Notification.objects.create(user=self.user, title='Unread Notification', message='Mark as read')
        url = reverse('notification-mark-as-read', kwargs={'pk': notification.pk})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        notification.refresh_from_db()
        self.assertTrue(notification.is_read)

    def test_mark_all_notifications_as_read(self):
        """
        Test marking all notifications as read for the authenticated user.
        """
        Notification.objects.create(user=self.user, title='Unread Notification 1', message='Mark as read')
        Notification.objects.create(user=self.user, title='Unread Notification 2', message='Mark as read')
        response = self.client.post(self.mark_all_read_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Notification.objects.filter(user=self.user, is_read=True).count(), 2)

    def test_get_unread_notifications(self):
        """
        Test retrieving all unread notifications for the authenticated user.
        """
        Notification.objects.create(user=self.user, title='Unread Notification', message='Unread')
        Notification.objects.create(user=self.user, title='Read Notification', message='Read', is_read=True)
        response = self.client.get(self.unread_notifications_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_mark_notification_as_unread(self):
        """
        Test marking a specific notification as unread.
        """
        notification = Notification.objects.create(user=self.user, title='Read Notification', message='Unread', is_read=True)
        url = reverse('notification-mark-as-unread', kwargs={'pk': notification.pk})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        notification.refresh_from_db()
        self.assertFalse(notification.is_read)

    def test_delete_all_notifications(self):
        """
        Test deleting all notifications for the authenticated user.
        """
        Notification.objects.create(user=self.user, title='Notification 1', message='Delete me')
        Notification.objects.create(user=self.user, title='Notification 2', message='Delete me')
        response = self.client.delete(self.delete_all_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Notification.objects.filter(user=self.user).count(), 0)

    def test_get_recent_notifications(self):
        """
        Test retrieving the 5 most recent notifications for the authenticated user.
        """
        for i in range(10):
            Notification.objects.create(user=self.user, title=f'Notification {i}', message='Recent')
            time.sleep(0.1)  # Ensure unique timestamps for notifications

        response = self.client.get(self.recent_notifications_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)

        # Verify the order of recent notifications
        recent_titles = [notification['title'] for notification in response.data]
        expected_titles = [f'Notification {i}' for i in range(9, 4, -1)]
        self.assertEqual(recent_titles, expected_titles)

    def test_retrieve_notification_not_owned(self):
        """
        Test retrieving a notification that does not belong to the authenticated user.
        """
        notification = Notification.objects.create(user=self.other_user, title='Other User Notification', message='No Access')
        url = reverse('notification-detail', kwargs={'pk': notification.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_notification_forbidden_field(self):
        """
        Test creating a notification with a forbidden `user` field in the payload.
        """
        data = {
            'title': 'Unauthorized Notification',
            'message': 'This should fail',
            'user': self.other_user.id
        }
        response = self.client.post(self.notification_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Notification.objects.first().user, self.user)  # Should default to the authenticated user
