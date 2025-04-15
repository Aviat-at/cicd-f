from django.db import models

class Department(models.Model):
    """Department model"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # Ensure it always returns a string, handling potential None values
        return str(self.name) if self.name else ''
