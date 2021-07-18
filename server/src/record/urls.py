from django.urls import path, include
from rest_framework.routers import DefaultRouter

from record import views


router = DefaultRouter()
router.register('user', views.RecordViewSet, basename='user')
router.register(
  'leaderboard',
  views.LeaderboardViewSet,
  basename='leaderboard'
)

app_name = 'record'

urlpatterns = [
  path('', include(router.urls))
]
