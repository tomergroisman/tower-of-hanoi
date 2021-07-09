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
