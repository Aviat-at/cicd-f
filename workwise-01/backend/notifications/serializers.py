from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Notification model, handling the transformation of
    Notification instances to JSON format and vice versa.

    This serializer enables CRUD operations on Notification objects through API interactions.
    """

    class Meta:
        """
        Meta options for the NotificationSerializer.

        Specifies the Notification model as the source and includes the following fields:
        - `id`: Unique identifier for the notification.
        - `user`: The user associated with the notification.
        - `title`: Title of the notification.
        - `message`: Detailed message content of the notification.
        - `is_read`: Boolean indicating if the notification has been read.
        - `created_at`: Timestamp of when the notification was created.
        """
        model = Notification
        fields = ['id', 'user', 'title', 'message', 'is_read', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


        

