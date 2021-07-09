from django.db import models


class CharField(models.CharField):
    """Empty string to None char field"""
    def get_prep_value(self, value):
        if value == '':
            return None
        return value
