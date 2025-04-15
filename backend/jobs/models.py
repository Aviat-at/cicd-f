from django.db import models

class Job(models.Model):
    """
    Model representing a job entry with a title, description, priority, and scheduling information.

    Attributes:
        title (CharField): The title of the job, up to 255 characters.
        description (TextField): Detailed description of the job.
        priority (IntegerField): Priority level of the job, with choices for Low, Medium, and High.
        scheduled_date (DateField): The date the job is scheduled for.
        created_at (DateTimeField): The timestamp when the job was created (auto-set on creation).
        updated_at (DateTimeField): The timestamp when the job was last updated (auto-updated).
    """

    PRIORITY_CHOICES = [
        (1, 'Low'),
        (2, 'Medium'),
        (3, 'High'),
    ]
    """Priority choices for the job, with levels Low, Medium, and High."""

    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.IntegerField(choices=PRIORITY_CHOICES)
    scheduled_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns the string representation of the job, showing its title.
        
        Returns:
            str: The title of the job, or "No Title" if the title is empty.
        """
        return str(self.title) if self.title else "No Title"
    