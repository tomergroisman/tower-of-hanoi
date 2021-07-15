from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Record

from record import serializers

PAGE_SIZE = 20


class RecipeViewSet(viewsets.ModelViewSet):
    """Manage record in the database"""
    queryset = Record.objects.all()
    serializer_class = serializers.RecordSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        best_records = bool(self.request.query_params.get('best_records', 0))
        queryset = self.queryset

        if best_records:
            queryset = queryset.filter(is_best=True)

        return queryset.filter(
            user=self.request.user
        ).order_by('-id').distinct()

    def perform_create(self, serializer):
        """Create a new record"""
        serializer.save(user=self.request.user)


class LeaderboardViewSet(viewsets.ModelViewSet):
    """Leaderboard view set"""
    queryset = Record.objects.all()
    serializer_class = serializers.LeaderboardSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    http_method_names = ['get']

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        level = self.request.query_params.get('level', 1)
        page = int(self.request.query_params.get('page', 1))
        [start_idx, end_idx] = [(page - 1) * PAGE_SIZE, page * PAGE_SIZE]

        queryset = self.queryset

        return queryset.filter(
            is_best=True,
            level=level,
        ).order_by('time').distinct()[start_idx:end_idx]
