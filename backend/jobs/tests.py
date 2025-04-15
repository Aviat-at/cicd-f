from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Job


class JobTests(APITestCase):
    def setUp(self):
        # Create a test user and authenticate using JWT
        self.user = User.objects.create_user(username='testuser', password='password123')
        
        # Obtain a token for the test user
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        
        # Create a job instance for testing
        self.job_data = {
            "title": "Test Job",
            "description": "A job for testing purposes",
            "priority": 2,
            "scheduled_date": "2024-12-01"
        }
        self.job = Job.objects.create(**self.job_data)

    def test_create_job(self):
        """
        Ensure we can create a new Job object.
        """
        url = reverse('job_list')  # URL name for the job creation endpoint
        data = {
            "title": "New Job",
            "description": "Testing job creation",
            "priority": 3,
            "scheduled_date": "2024-12-10"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Job.objects.count(), 2)
        self.assertEqual(Job.objects.last().title, "New Job")

    def test_get_job_list(self):
        """
        Ensure we can retrieve the job list.
        """
        url = reverse('job_list')  # URL name for listing jobs
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Job.objects.count())

    def test_get_job_detail(self):
        """
        Ensure we can retrieve a specific job by ID.
        """
        url = reverse('job_detail', args=[self.job.id])  # URL name for job detail view
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.job.title)

    def test_update_job(self):
        """
        Ensure we can update an existing job.
        """
        url = reverse('job_detail', args=[self.job.id])
        data = {
            "title": "Updated Job Title",
            "description": "Updated description",
            "priority": 1,
            "scheduled_date": "2024-12-05"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.job.refresh_from_db()
        self.assertEqual(self.job.title, "Updated Job Title")
       