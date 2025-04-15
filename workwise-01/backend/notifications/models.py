# pylint: disable=no-member
from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):
    """
    Model representing a user notification.

    Attributes:
        user (ForeignKey): The user associated with the notification.
        title (CharField): The title of the notification, with a maximum length of 255 characters.
        message (TextField): The detailed message of the notification.
        is_read (BooleanField): Indicates if the notification has been read; defaults to False.
        created_at (DateTimeField): The timestamp when the notification was created, auto-set on creation.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        Returns a string representation of the notification, showing the username and the title.

        Returns:
            str: A formatted string with the user's username and the notification title.
        """
        return f"{self.user.username} - {self.title}"
