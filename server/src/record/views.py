from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Record

from record import serializers


class RecipeViewSet(viewsets.ModelViewSet):
    """Manage record in the database"""
    queryset = Record.objects.all()
    serializer_class = serializers.RecordSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        best = bool(self.request.query_params.get('best_records', 0))
        queryset = self.queryset

        if best:
            queryset = queryset.filter(is_best=True)

        return queryset.filter(
            user=self.request.user
        ).order_by('-id').distinct()

    def perform_create(self, serializer):
        """Create a new record"""
        serializer.save(user=self.request.user)
