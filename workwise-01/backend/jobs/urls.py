from django.urls import path
from .views import JobListView, JobDetailView

urlpatterns = [
    path('jobs/', JobListView.as_view(), name='job_list'),
    path('jobs/<int:id>/', JobDetailView.as_view(), name='job_detail'),
]
