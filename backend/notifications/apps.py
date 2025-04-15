from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    """
    Configuration class for the Notifications application.

    This class sets up the Notifications app within the Django project, 
    specifying the default primary key type for models as `BigAutoField` 
    and registering the application under the name 'notifications'.
    """

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'
