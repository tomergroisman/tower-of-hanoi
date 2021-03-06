from collections import OrderedDict
from django.contrib.auth import get_user_model, authenticate

from rest_framework import serializers

from core.services.translation import i18n


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user model"""

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'name', 'nickname', 'icon']
        extra_kwargs = {
            'email': {
                'error_messages': {
                    'required': i18n('AUTH_USER_NO_EMAIL'),
                    'blank': i18n('AUTH_USER_NO_EMAIL'),
                }
            },
            'password': {
                'write_only': True,
                'min_length': 5,
                'error_messages': {
                    'required': i18n('AUTH_USER_NO_PASSWORD'),
                    'min_length': i18n('CREATE_USER_SHORT_PASSWORD'),
                    'blank': i18n('AUTH_USER_NO_PASSWORD'),
                }
            },
        }

    def to_representation(self, instance):
        result = super(UserSerializer, self).to_representation(instance)
        return OrderedDict(
            [(key, result[key]) for key in result if result[key] is not None]
        )

    def create(self, validated_data):
        """Create and return a new user"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update and return a user"""
        print(validated_data)
        password = validated_data.pop('password', None)

        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""

    email = serializers.CharField(
        error_messages={
            'blank': i18n('AUTH_USER_NO_EMAIL')
        }
    )
    password = serializers.CharField(
        error_messages={
            'blank': i18n('AUTH_USER_NO_PASSWORD')
        },
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, data):
        """Validate and authenticate the user"""
        email = data.get('email')
        password = data.get('password')

        user = authenticate(
            request=self.context.get('request'),
            email=email,
            password=password
        )

        if not user:
            msg = i18n('AUTH_INVALID_CREDENTIALS')
            raise serializers.ValidationError(msg, code='authentication')

        data['user'] = user
        return data
