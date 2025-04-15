from django.urls import path
from .views import RegisterUserView, ProtectedView, UserDetailView, UserListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='user_register'),  # Ensure this name matches
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected_view'),  # Ensure this name matches

    # User CRUD routes
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('users/', UserListView.as_view(), name='user_list'),
]
