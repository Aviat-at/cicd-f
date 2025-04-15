# pylint: disable=no-member

from django.db import models
from django.contrib.auth.models import User

class Machine(models.Model):
    """
    Model representing a machine in the system.

    Attributes:
        name (CharField): The name of the machine.
        model_number (CharField): The model number of the machine.
        location (CharField): The location where the machine is placed.
        status (CharField): The operational status of the machine, either 'operational' or 'maintenance'.
        last_maintenance_date (DateField): The date of the last maintenance, optional.
    """

    name = models.CharField(max_length=100)
    model_number = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=[('operational', 'Operational'), ('maintenance', 'Maintenance')])
    last_maintenance_date = models.DateField(null=True, blank=True)

    def __str__(self):
        """
        Returns a string representation of the machine, including its name and model number.
        
        Returns:
            str: A formatted string with machine name and model.
        """
        return f"Machine: {self.name} (Model: {self.model_number})"


class MaintenanceTicket(models.Model):
    """
    Model representing a maintenance ticket associated with a machine.

    Attributes:
        machine (ForeignKey): The machine associated with this ticket.
        issue_description (TextField): A description of the issue with the machine.
        reported_by (ForeignKey): The user who reported the issue.
        status (CharField): The current status of the ticket, choices are 'open', 'in_progress', or 'closed'.
        created_at (DateTimeField): The date and time when the ticket was created, auto-set on creation.
        updated_at (DateTimeField): The date and time when the ticket was last updated, auto-updated.
    """

    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name='tickets')
    issue_description = models.TextField()
    reported_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=50, choices=[('open', 'Open'), ('in_progress', 'In Progress'), ('closed', 'Closed')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the maintenance ticket, including the machine's name,
        a preview of the issue description, and the ticket status.

        Returns:
            str: A formatted string with machine name, an issue preview, and the status.
        """
        if isinstance(self.issue_description, str):
            return f"Ticket for {self.machine.name}: {self.issue_description[:20]}... (Status: {self.status})"
        else:
            return f"Ticket for {self.machine.name}: No description provided (Status: {self.status})"
        