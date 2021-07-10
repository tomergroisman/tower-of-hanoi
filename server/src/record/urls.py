from django.urls import path, include
from rest_framework.routers import DefaultRouter

from record import views


router = DefaultRouter()
router.register('records', views.RecipeViewSet)

app_name = 'record'

urlpatterns = [
  path('', include(router.urls))
]
