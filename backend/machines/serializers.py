from rest_framework import serializers
from .models import Machine, MaintenanceTicket

class MachineSerializer(serializers.ModelSerializer):
    """
    Serializer for the Machine model, providing serialization and deserialization
    of all Machine fields for API interactions.

    This serializer is used to convert Machine model instances to JSON format
    and vice versa, allowing CRUD operations on Machine objects via the API.
    """

    class Meta:
        """
        Meta options for MachineSerializer.

        Specifies that all fields from the Machine model should be included
        in the serialized representation.
        """
        model = Machine
        fields = '__all__'


class MaintenanceTicketSerializer(serializers.ModelSerializer):
    """
    Serializer for the MaintenanceTicket model, handling serialization and deserialization
    of all MaintenanceTicket fields for API interactions.

    This serializer facilitates CRUD operations on MaintenanceTicket objects
    through API endpoints.
    """

    class Meta:
        """
        Meta options for MaintenanceTicketSerializer.

        Specifies that all fields from the MaintenanceTicket model should be included
        in the serialized representation.
        """
        model = MaintenanceTicket
        fields = '__all__'
