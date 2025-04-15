# pylint: disable=no-member
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Machine, MaintenanceTicket
from .serializers import MachineSerializer, MaintenanceTicketSerializer

class MachineViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Machine instances.

    Provides CRUD operations and additional custom actions.
    """
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def schedule_maintenance(self, request, pk=None):  # pylint: disable=unused-argument
        """Custom action to schedule maintenance for a machine."""
        machine = self.get_object()
        machine.status = 'maintenance'
        machine.save()
        return Response({'message': 'Maintenance scheduled successfully'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def maintenance_history(self, request, pk=None):  # pylint: disable=unused-argument
        """Custom action to retrieve maintenance history for a machine."""
        machine = self.get_object()
        tickets = MaintenanceTicket.objects.filter(machine=machine)
        serializer = MaintenanceTicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def resolve_issue(self, request, pk=None):  # pylint: disable=unused-argument
        """Custom action to resolve an issue related to a maintenance ticket."""
        ticket_id = request.data.get('ticket_id')
        ticket = MaintenanceTicket.objects.filter(pk=ticket_id, machine=pk).first()
        if not ticket:
            return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
        ticket.status = 'closed'
        ticket.save()
        return Response({'message': 'Issue resolved successfully'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def operational_machines(self, request):  # pylint: disable=unused-argument
        """Custom action to list all operational machines."""
        machines = Machine.objects.filter(status='operational')
        serializer = self.get_serializer(machines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def maintenance_due(self, request):  # pylint: disable=unused-argument
        """Custom action to list machines due for maintenance."""
        from datetime import timedelta, date
        threshold_date = date.today() - timedelta(days=30)
        machines = Machine.objects.filter(last_maintenance_date__lt=threshold_date)
        serializer = self.get_serializer(machines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def update_location(self, request, pk=None):  # pylint: disable=unused-argument
        """Custom action to update the location of a machine."""
        machine = self.get_object()
        new_location = request.data.get('location')
        if not new_location:
            return Response({'error': 'Location is required'}, status=status.HTTP_400_BAD_REQUEST)
        machine.location = new_location
        machine.save()
        return Response({'message': 'Location updated successfully'}, status=status.HTTP_200_OK)

class MaintenanceTicketViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing MaintenanceTicket instances.

    Provides CRUD operations and additional custom actions.
    """
    queryset = MaintenanceTicket.objects.all()
    serializer_class = MaintenanceTicketSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def open_tickets(self, request):  # pylint: disable=unused-argument
        """Custom action to list all open maintenance tickets."""
        tickets = MaintenanceTicket.objects.filter(status='open')
        serializer = self.get_serializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
