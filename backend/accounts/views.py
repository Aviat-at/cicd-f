from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.serializers import ModelSerializer


# User Serializer
class UserSerializer(ModelSerializer):
    """Serializer for the User model, providing basic fields for user information."""

    class Meta:
        """
        Meta options for the UserSerializer.
        Specifies the model to be serialized (`User`) and the fields that should
        be included in the serialized output. These fields are:
        - `id`: The unique identifier for the user.
        - `username`: The user's username.
        - `email`: The user's email address.
        - `first_name`: The user's first name.
        - `last_name`: The user's last name.
        """
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


# User Registration View
class RegisterUserView(APIView):
    """
    API View to handle user registration.
    Allows anyone to register a new user.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Handle POST request to register a new user.
        Returns a success message or an error if the username already exists.
        """
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        user.save()

        # Create JWT Token for the newly registered user
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


# Protected View Example
class ProtectedView(APIView):
    """
    API View for a protected endpoint.
    Only authenticated users can access this view.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handle GET request for authenticated users.
        Returns a success message if the user is authenticated.
        """
        return Response({"message": "This is a protected view."})


# User Detail (Read/Update/Delete) View
class UserDetailView(APIView):
    """
    Retrieve, update or delete a user instance.
    Only accessible by authenticated users.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """
        Retrieve a user by their primary key (pk).
        """
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update a user's details.
        """
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete a user by their primary key (pk).
        """
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# List Users View (Admin only)
class UserListView(generics.ListAPIView):
    """
    List all users. Only accessible to admin users.
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
