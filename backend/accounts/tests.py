from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegistrationTests(APITestCase):
    """
    Test cases for user registration functionality, verifying that users can 
    register, and handling cases where the username already exists.
    """

    def test_user_registration(self):
        """
        Test successful user registration with valid data.
        
        Expects:
            - HTTP 201 Created status code.
            - Response contains 'access' and 'refresh' tokens.
        """
        url = reverse('user_register')
        data = {
            "username": "newuser",
            "password": "newpassword123",
            "email": "newuser@example.com"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_registration_with_existing_username(self):
        """
        Test user registration with an existing username.
        
        Expects:
            - HTTP 400 Bad Request status code.
            - Response contains an error indicating the username is taken.
        """
        User.objects.create_user(username="existinguser", password="password123")
        url = reverse('user_register')
        data = {
            "username": "existinguser",
            "password": "anotherpassword123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Username already exists")


class UserLoginAndTokenTests(APITestCase):
    """
    Test cases for user login and JWT token retrieval.
    """

    def setUp(self):
        """
        Set up a test user for login and token retrieval tests.
        """
        self.user = User.objects.create_user(username="testuser", password="password123")

    def test_token_obtain_pair(self):
        """
        Test obtaining JWT tokens (access and refresh) with valid credentials.
        
        Expects:
            - HTTP 200 OK status code.
            - Response contains 'access' and 'refresh' tokens.
        """
        url = reverse('token_obtain_pair')
        data = {
            "username": "testuser",
            "password": "password123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_token_refresh(self):
        """
        Test refreshing the JWT access token using a valid refresh token.
        
        Expects:
            - HTTP 200 OK status code.
            - Response contains a new 'access' token.
        """
        refresh = RefreshToken.for_user(self.user)
        url = reverse('token_refresh')
        data = {"refresh": str(refresh)}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)


class ProtectedViewTests(APITestCase):
    """
    Test cases for accessing a protected view with and without valid authorization.
    """

    def setUp(self):
        """
        Set up a user and authenticate with a JWT access token for protected view access tests.
        """
        self.user = User.objects.create_user(username="protecteduser", password="password123")
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_access_protected_view(self):
        """
        Test accessing a protected view with valid authorization.
        
        Expects:
            - HTTP 200 OK status code.
            - Response contains a message confirming access to the protected view.
        """
        url = reverse('protected_view')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "This is a protected view.")

    def test_access_protected_view_without_auth(self):
        """
        Test accessing a protected view without providing authorization.

        Expects:
            - HTTP 401 Unauthorized status code.
        """
        self.client.credentials()  # Remove any authentication
        url = reverse('protected_view')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class UserCRUDTests(APITestCase):
    """
    Test cases for basic CRUD operations on users by an authenticated admin user.
    """

    def setUp(self):
        """
        Set up an admin user for performing CRUD operations on other users.
        """
        self.admin_user = User.objects.create_superuser(username="adminuser", password="adminpass123")
        self.client.force_authenticate(user=self.admin_user)
        self.user = User.objects.create_user(username="regularuser", password="password123")

    def test_user_list(self):
        """
        Test retrieving a list of users as an authenticated admin.
        
        Expects:
            - HTTP 200 OK status code.
            - Response contains at least one user.
        """
        url = reverse('user_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_user_detail_retrieve(self):
        """
        Test retrieving details of a specific user by ID as an authenticated admin.
        
        Expects:
            - HTTP 200 OK status code.
            - Response contains the correct user information.
        """
        url = reverse('user_detail', args=[self.user.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], "regularuser")

    def test_user_update(self):
        """
        Test updating user details by ID as an authenticated admin.
        
        Expects:
            - HTTP 200 OK status code.
            - User's first name is updated.
        """
        url = reverse('user_detail', args=[self.user.pk])
        data = {"first_name": "UpdatedName"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "UpdatedName")

    def test_user_delete(self):
        """
        Test deleting a user by ID as an authenticated admin.
        
        Expects:
            - HTTP 204 No Content status code.
            - User no longer exists in the database.
        """
        url = reverse('user_detail', args=[self.user.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(pk=self.user.pk).exists())
