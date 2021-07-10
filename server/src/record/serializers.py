from rest_framework import serializers

from core.models import Record


class RecordSerializer(serializers.ModelSerializer):
    """Serializer for record objects"""
    class Meta:
        model = Record
        fields = (
            'id',
            'level',
            'time',
            'moves',
            'date',
        )
        read_only_field = ('id',)
