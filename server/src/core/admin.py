from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from core.services.translation import i18n
from core import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'name']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (
            i18n('ADMIN_USER_PERSONAL_INFO'),
            {'fields': ('name',)}
        ),
        (
            i18n('ADMIN_USER_PERMISSIONS'),
            {'fields': ('is_active', 'is_staff', 'is_superuser')}
        ),
        (i18n('ADMIN_USER_IMPORTANT_DAYS'), {'fields': ('last_login',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )


admin.site.register(models.User, UserAdmin)
