from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    """
    Serializer for the Job model, transforming Job instances into JSON and vice versa.

    This serializer includes fields for the job's title, description, priority, 
    scheduling date, and timestamps for creation and updates.
    """

    class Meta:
        """
        Meta options for the JobSerializer.

        Specifies the Job model to be serialized and includes the following fields:
        - `id`: Unique identifier for the job.
        - `title`: Title of the job.
        - `description`: Detailed description of the job.
        - `priority`: Priority level of the job (Low, Medium, High).
        - `scheduled_date`: Date the job is scheduled.
        - `created_at`: Timestamp of job creation.
        - `updated_at`: Timestamp of the last update.
        """
        model = Job
        fields = ['id', 'title', 'description', 'priority', 'scheduled_date', 'created_at', 'updated_at']
        