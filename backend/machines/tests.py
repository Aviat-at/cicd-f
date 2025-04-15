# pylint: disable=no-member
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Machine, MaintenanceTicket
from datetime import timedelta, date

class MachineAPITestCase(APITestCase):
    """
    Test cases for Machine model API endpoints, focusing on CRUD operations
    and checking access with and without authentication.
    """

    def setUp(self):
        """
        Set up test user and machine instances, and generate a JWT token
        for authenticated API requests.
        """
        self.user = User.objects.create_user(username='testuser', password='password123')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)


        self.machine = Machine.objects.create(
            name='Machine 1',
            model_number='M123',
            location='Warehouse 1',
            status='operational',
            last_maintenance_date=date.today() - timedelta(days=31)
        )

    def authenticate(self):
        """Helper method to authenticate requests using the JWT token."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_schedule_maintenance(self):
        """Test scheduling maintenance for a machine."""
        self.authenticate()
        url = reverse('machine-schedule-maintenance', kwargs={'pk': self.machine.pk})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.machine.refresh_from_db()
        self.assertEqual(self.machine.status, 'maintenance')

    def test_maintenance_history(self):
        """Test retrieving maintenance history for a machine."""
        self.authenticate()
        MaintenanceTicket.objects.create(
            machine=self.machine,
            issue_description='Issue 1',
            reported_by=self.user,
            status='open'
        )
        url = reverse('machine-maintenance-history', kwargs={'pk': self.machine.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_operational_machines(self):
        """Test listing all operational machines."""
        self.authenticate()
        url = reverse('machine-operational-machines')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_maintenance_due(self):
        """Test listing machines due for maintenance."""
        self.authenticate()
        url = reverse('machine-maintenance-due')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_update_location(self):
        """Test updating the location of a machine."""
        self.authenticate()
        new_location = 'New Warehouse'
        url = reverse('machine-update-location', kwargs={'pk': self.machine.pk})
        response = self.client.patch(url, {'location': new_location})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.machine.refresh_from_db()
        self.assertEqual(self.machine.location, new_location)

    def test_machine_list_authenticated(self):
        """Test retrieving the list of machines with authentication."""
        self.authenticate()
        response = self.client.get(reverse('machine-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_machine_list_unauthenticated(self):
        """Test retrieving the list of machines without authentication."""
        response = self.client.get(reverse('machine-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_machine_authenticated(self):
        """Test creating a machine with authentication."""
        self.authenticate()
        data = {
            'name': 'Machine 2',
            'model_number': 'M456',
            'location': 'Warehouse 2',
            'status': 'operational',
        }
        response = self.client.post(reverse('machine-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_machine_unauthenticated(self):
        """Test creating a machine without authentication."""
        data = {
            'name': 'Machine 3',
            'model_number': 'M789',
            'location': 'Warehouse 3',
            'status': 'operational',
        }
        response = self.client.post(reverse('machine-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_machine_authenticated(self):
        """Test updating a machine with authentication."""
        self.authenticate()
        data = {
            'name': 'Updated Machine',
            'model_number': 'M1234',
            'location': 'Warehouse 4',
            'status': 'maintenance',
        }
        url = reverse('machine-detail', kwargs={'pk': self.machine.pk})
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_machine_unauthenticated(self):
        """Test updating a machine without authentication."""
        data = {
            'name': 'Updated Machine',
            'model_number': 'M1234',
            'location': 'Warehouse 4',
            'status': 'maintenance',
        }
        url = reverse('machine-detail', kwargs={'pk': self.machine.pk})
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class MaintenanceTicketAPITestCase(APITestCase):
    """
    Test cases for MaintenanceTicket model API endpoints, focusing on CRUD operations
    and checking access with and without authentication.
    """

    def setUp(self):
        """
        Set up test user, machine, and maintenance ticket instances, and
        generate a JWT token for authenticated API requests.
        """
        self.user = User.objects.create_user(username='testuser', password='password123')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        self.machine = Machine.objects.create(
            name='Machine 1',
            model_number='M123',
            location='Warehouse 1',
            status='operational'
        )
        self.ticket = MaintenanceTicket.objects.create(
            machine=self.machine,
            issue_description='Issue with machine',
            reported_by=self.user,
            status='open'
        )

    def authenticate(self):
        """Helper method to authenticate requests using the JWT token."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_ticket_list_authenticated(self):
        """Test retrieving the list of maintenance tickets with authentication."""
        self.authenticate()
        response = self.client.get(reverse('maintenanceticket-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ticket_list_unauthenticated(self):
        """Test retrieving the list of maintenance tickets without authentication."""
        response = self.client.get(reverse('maintenanceticket-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_ticket_authenticated(self):
        """Test creating a maintenance ticket with authentication."""
        self.authenticate()
        data = {
            'machine': self.machine.id,
            'issue_description': 'New issue with machine',
            'reported_by': self.user.id,
            'status': 'open',
        }
        response = self.client.post(reverse('maintenanceticket-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_ticket_unauthenticated(self):
        """Test creating a maintenance ticket without authentication."""
        data = {
            'machine': self.machine.id,
            'issue_description': 'New issue with machine',
            'reported_by': self.user.id,
            'status': 'open',
        }
        response = self.client.post(reverse('maintenanceticket-list'), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_ticket_authenticated(self):
        """Test updating a maintenance ticket with authentication."""
        self.authenticate()
        data = {
            'machine': self.machine.id,
            'issue_description': 'Updated issue description',
            'reported_by': self.user.id,
            'status': 'in_progress',
        }
        url = reverse('maintenanceticket-detail', kwargs={'pk': self.ticket.pk})
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_ticket_unauthenticated(self):
        """Test updating a maintenance ticket without authentication."""
        data = {
            'machine': self.machine.id,
            'issue_description': 'Updated issue description',
            'reported_by': self.user.id,
            'status': 'in_progress',
        }
        url = reverse('maintenanceticket-detail', kwargs={'pk': self.ticket.pk})
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)