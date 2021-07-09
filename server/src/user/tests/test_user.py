from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.tests.test_models import create_mock_user


CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')


class PublicUserApiTests(TestCase):
    """Unauthenticated users api tests"""

    def setUp(self):
        self.client = APIClient()
        self.mock_user = {
            'email': 'test@test.com',
            'password': 'test123',
            'name': 'Mona Lisa',
            'nickname': 'Mona',
        }

    def test_create_user_valid(self):
        """should create a user from api url"""
        res = self.client.post(CREATE_USER_URL, self.mock_user)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        user = get_user_model().objects.get(**res.data)

        self.assertTrue(user.check_password(self.mock_user['password']))
        self.assertNotIn('password', res.data)

    def test_create_user_user_exists(self):
        """should fail to create user if the user is already exists"""
        create_mock_user(**self.mock_user)

        res = self.client.post(CREATE_USER_URL, self.mock_user)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_nickname_exists(self):
        """should fail to create user if the user is already exists"""
        create_mock_user(**self.mock_user)
        second_mock_user = {
            'email': 'test@test1.com',
            'password': 'test123',
            'name': 'Pablo Picasso',
            'nickname': 'Mona',
        }

        res = self.client.post(CREATE_USER_URL, second_mock_user)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_password_too_short(self):
        """should fail to create user if the password is too short"""
        res = self.client.post(CREATE_USER_URL, {
            **self.mock_user,
            'password': 'pw'
        })

        db_user = get_user_model().objects.filter(
            email=self.mock_user['email']
        )

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(db_user)

    def test_create_user_invalid_method(self):
        """
        should fail to create a user
        due to request with different method than POST
        """
        res = self.client.get(CREATE_USER_URL, self.mock_user)

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_create_token_valid(self):
        """should create a token for the user"""
        create_mock_user(**self.mock_user)
        res = self.client.post(TOKEN_URL, self.mock_user)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('token', res.data)

    def test_create_token_invalid_credentials(self):
        """should not create a token for invalid credentials"""
        create_mock_user(**self.mock_user)
        res = self.client.post(TOKEN_URL, {
            **self.mock_user,
            'password': 'WrongPass'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    def test_create_token_no_user(self):
        """should not create a token for a non existing user"""
        res = self.client.post(TOKEN_URL, self.mock_user)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    def test_create_token_missing_field(self):
        """should not create a token doe to a missing field"""
        res = self.client.post(TOKEN_URL, {
            **self.mock_user,
            'password': ''
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    def test_retrive_user_unauthenticated(self):
        """should fail to retrive the user details"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):
    """Authenticated users api tests"""

    def setUp(self):
        self.user = create_mock_user()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrive_user(self):
        """should retrive the user details"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['email'], self.user.email)
        self.assertEqual(res.data['name'], self.user.name)
        self.assertNotIn('password', res.data)

    def test_update_profile_invalid_method(self):
        """should fail to update user due to POST request"""
        res = self.client.post(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_profile_valid_patch(self):
        """should update user via PATCH request"""
        update_fields = {
            'password': 'NewPassword!',
            'name': 'Mona Lisa'
        }
        res = self.client.patch(ME_URL, update_fields)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()

        self.assertTrue(self.user.check_password(update_fields['password']))
        self.assertEquals(self.user.name, update_fields['name'])

    def test_update_profile_valid_put(self):
        """should update user via PUT request"""
        update_user = {
            'email': 'new@email.com',
            'password': 'NewPassword!',
        }
        res = self.client.put(ME_URL, update_user)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()

        self.assertTrue(self.user.check_password(update_user['password']))
        self.assertEquals(self.user.email, update_user['email'])
        self.assertTrue(self.user.name)
