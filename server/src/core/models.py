from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from core.services.translation import i18n
from core import fields


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, nickname=None, **extra_fields):
        """Create and save a new user"""
        if not email:
            raise ValueError(i18n('AUTH_USER_NO_EMAIL'))

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname,
            **extra_fields
        )
        user.set_password(password)

        if not nickname:
            user.nickname = email

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
    email = models.EmailField(
        max_length=255,
        unique=True,
        error_messages={
            'required': i18n('AUTH_USER_NO_EMAIL'),
            'unique': i18n('CREATE_USER_UNIQUE_EMAIL'),
            'blank': i18n('AUTH_USER_NO_EMAIL'),
        }
    )
    nickname = fields.CharField(
        max_length=255,
        blank=True,
        null=True,
        unique=True,
        error_messages={
            'unique': i18n('CREATE_USER_UNIQUE_NICKNAME'),
        }
    )
    name = fields.CharField(max_length=255, blank=True, null=True)
    icon = fields.CharField(max_length=255, blank=True, null=True)
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


class RecordManager(models.Manager):

    def create(self, user, time, moves, level, **extra_fields):
        """Create and save a new record"""
        is_best = False
        try:
            best_record = super().get_queryset().filter(
                user=user,
                level=level,
                is_best=True
            )[0]
            better_time = best_record.time > time
            better_moves = best_record.time == time and \
                best_record.moves > moves
            if better_time or better_moves:
                is_best = True
                best_record.is_best = False
                best_record.save(using=self._db)
        except IndexError:
            is_best = True

        record = super().create(
            user=user,
            time=time,
            moves=moves,
            is_best=is_best,
            level=level,
            **extra_fields)

        return record


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
    is_best = models.BooleanField(default=False)

    objects = RecordManager()

    def __str__(self):
        return f"Level: {self.level} \
            Time: {self.time} \
            Moves: {self.moves}"
