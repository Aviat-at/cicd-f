from django.apps import AppConfig


class MachinesConfig(AppConfig):
    """
    Configuration class for the Machines application.

    Sets the default auto-incrementing primary key field type to `BigAutoField`
    and registers the application under the name 'machines'.
    """

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'machines'
    