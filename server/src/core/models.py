from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from core.services.translation import i18n
from core import fields


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a new user"""
        if not email:
            raise ValueError(i18n('CREATE_USER_NO_EMAIL'))

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a new superuser"""
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model thar supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = fields.CharField(max_length=255, blank=True, null=True)
    nickname = fields.CharField(
        max_length=255, blank=True, null=True, unique=True
    )
    is_active = models.BooleanField(
        i18n('ADMIN_USER_ACTIVE'),
        help_text=i18n('ADMIN_USER_ACTIVE_HELPER_TEXT'),
        default=True
    )
    is_staff = models.BooleanField(
        i18n('ADMIN_USER_STAFF_STATUS'),
        help_text=i18n('ADMIN_USER_STAFF_STATUS_HELPER_TEXT'),
        default=False
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Record(models.Model):
    """Record model"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    date = models.DateField(auto_now=False, auto_now_add=True)
    time = models.CharField(max_length=255)
    level = models.IntegerField()
    moves = models.IntegerField()

    def __str__(self):
        return f"Level: {self.level} \
            Time: {self.time} \
            Moves: {self.moves}"
