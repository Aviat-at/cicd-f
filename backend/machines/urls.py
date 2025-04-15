from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MachineViewSet, MaintenanceTicketViewSet

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'machines', MachineViewSet, basename='machine')
router.register(r'tickets', MaintenanceTicketViewSet, basename='maintenanceticket')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
