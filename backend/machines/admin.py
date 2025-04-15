from django.contrib import admin
from .models import Machine
from .models import MaintenanceTicket

@admin.register(MaintenanceTicket)
class MaintenanceTicketAdmin(admin.ModelAdmin):
    """
    Admin interface options for the MaintenanceTicket model.

    Displays relevant fields for each maintenance ticket in the admin list view,
    allows searching by machine name, issue description, and status, and enables 
    filtering by status and creation/update timestamps.
    """
    list_display = ('machine', 'issue_description', 'reported_by', 'status', 'created_at', 'updated_at')
    search_fields = ('machine__name', 'issue_description', 'status')
    list_filter = ('status', 'created_at', 'updated_at')


@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    """
    Admin interface options for the Machine model.

    Displays important fields for each machine in the admin list view, enables 
    search by name, model number, status, and location, and provides filters 
    for machine status, location, and last maintenance date.
    """
    list_display = ('name', 'model_number', 'status', 'location', 'last_maintenance_date')
    search_fields = ('name', 'model_number', 'status', 'location')
    list_filter = ('status', 'location', 'last_maintenance_date')
    