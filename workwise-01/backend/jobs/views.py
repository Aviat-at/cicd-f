# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Job
from .serializers import JobSerializer
from django.utils.timezone import now, timedelta

class JobListView(APIView):
    """
    API view to retrieve a list of all jobs.

    This view provides a GET method that retrieves all instances of the Job model
    and serializes them using JobSerializer. The serialized data is returned as a response.
    """

    def get(self, request):
        """
        Handle GET requests to retrieve a list of jobs.

        Returns:
            Response: JSON representation of the list of jobs.
        """
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Job detail API view (supports GET, PUT, and DELETE)
class JobDetailView(APIView):
    """
    API view to retrieve a single job by its ID.

    This view provides a GET method that retrieves a specific instance of the Job model
    based on the provided ID. If the job does not exist, it returns a 404 status.
    """

    def get(self, request, id):
        """
        Handle GET requests to retrieve a specific job by ID.

        Args:
            request: The HTTP request object.
            id (int): The ID of the job to retrieve.

        Returns:
            Response: JSON representation of the job details if found, otherwise a 404 status.
        """
        try:
            job = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = JobSerializer(job)
        return Response(serializer.data)

    def put(self, request, id):
        try:
            job = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = JobSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            job = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
# 1. Get Jobs by Priority
class JobsByPriorityView(APIView):
    def get(self, request, priority):
        jobs = Job.objects.filter(priority=priority)
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

# 2. Get Upcoming Jobs
class UpcomingJobsView(APIView):
    def get(self, request):
        jobs = Job.objects.filter(scheduled_date__gte=now().date())
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

# 3. Mark Job as Completed
class MarkJobCompletedView(APIView):
    def post(self, request, id):
        try:
            job = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        job.priority = 0  # Assume 0 is a custom value for 'Completed'
        job.save()
        serializer = JobSerializer(job)
        return Response(serializer.data)

# 4. Duplicate Job
class DuplicateJobView(APIView):
    def post(self, request, id):
        try:
            job = Job.objects.get(id=id)
        except Job.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        job.pk = None  # Clear the primary key to create a new instance
        job.title = f"{job.title} (Copy)"
        job.save()
        serializer = JobSerializer(job)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# 5. Bulk Update Priority
class BulkUpdatePriorityView(APIView):
    def post(self, request):
        job_ids = request.data.get("job_ids", [])
        new_priority = request.data.get("priority")

        if not job_ids or new_priority is None:
            return Response(
                {"error": "job_ids and priority are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        jobs = Job.objects.filter(id__in=job_ids)
        jobs.update(priority=new_priority)
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

# 6. Get Recently Updated Jobs
class RecentlyUpdatedJobsView(APIView):
    def get(self, request):
        one_day_ago = now() - timedelta(days=1)
        jobs = Job.objects.filter(updated_at__gte=one_day_ago)
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data) 
