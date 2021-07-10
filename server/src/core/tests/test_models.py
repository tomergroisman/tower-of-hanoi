from django.test import TestCase
from django.contrib.auth import get_user_model


def create_mock_user(
    email='test@test.com',
    password='test123',
    name='Pablo Picasso',
    nickname='PabloP'
):
    """Create a new mock user"""
    return get_user_model().objects.create_user(
        email=email,
        password=password,
        name=name,
        nickname=nickname
    )


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """should create a user if the email is successfull"""
        email = 'test@example.com'
        password = 'test123'
        name = 'Pablo Picasso'
        nickname = 'Pablo'
        user = get_user_model().objects.create_user(
            email=email,
            password=password,
            name=name,
            nickname=nickname
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.name, name)
        self.assertEqual(user.nickname, nickname)

    def test_new_user_email_normalized(self):
        """should create a user with a normalized email address"""
        email = 'test@EXAMPLE.COM'
        password = 'test123'

        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """should raise an error for invalid email address"""
        with self.assertRaises(ValueError):
            email = None
            password = 'test123'

            get_user_model().objects.create_user(
                email=email,
                password=password
            )

    def test_create_new_superuser(self):
        """should create a new superuser"""
        email = 'test@example.com'
        password = 'test123'

        user = get_user_model().objects.create_superuser(
            email=email,
            password=password
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
