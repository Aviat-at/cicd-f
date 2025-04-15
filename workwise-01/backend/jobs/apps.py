from django.apps import AppConfig


class JobsConfig(AppConfig):
    """
    Configuration class for the Jobs application.

    This class sets up the Jobs application with the default auto-incrementing
    primary key field type (`BigAutoField`) and registers the application under
    the name 'jobs'.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "jobs"
    