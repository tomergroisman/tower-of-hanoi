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


class LeaderboardSerializer(serializers.ModelSerializer):
    """Serializer for leaderboard record objects"""
    nickname = serializers.SerializerMethodField()

    class Meta:
        model = Record
        fields = (
            'id',
            'level',
            'time',
            'moves',
            'date',
            'nickname'
        )
        read_only_field = ('id', 'nickname')

    def get_nickname(self, obj):
        """Get the instance nickname"""
        return obj.user.nickname
