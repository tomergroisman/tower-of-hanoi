from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Record


MOCKED_USER = {
    'email': 'test@example.com',
    'password': 'test123',
    'nickname': 'Mona Lisa'
}

RECORD_URL = reverse('record:record-list')

mock_record = {
    'level':  1,
    'moves': 7,
    'time': '00:00:15',
}


def create_mock_record(user, **params):
    """Create and return a mock record"""
    mock_record.update(params)

    return Record.objects.create(user=user, **mock_record)

# TODO
# class PublicRecordApiTests(TestCase):
#     """Public record api tests (unauthorized)"""

#     def setUp(self):
#         self.client = APIClient()

#     def test_retrive_leaderboard_records_list(self):
#         """should fail to retrive tags due to login require"""
#         res = self.client.get(RECIPES_URL)

#         self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateIngredientsApiTests(TestCase):
    """Private recipe api tests (authenticated)"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(**MOCKED_USER)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_record(self):
        """should create a new record for the user"""
        res = self.client.post(RECORD_URL, mock_record)

        is_exists = Record.objects.filter(
            user=self.user,
            **mock_record
        )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(is_exists)

    def test_records_limited_to_user(self):
        """
        should test that the retrived records
        are for the authenticated user
        """
        user = get_user_model().objects.create_user('test@gmail.com', '123456')
        Record.objects.create(user=user, **mock_record)
        record = Record.objects.create(
            user=self.user, **{**mock_record, 'time': '99:99:99'}
        )

        res = self.client.get(RECORD_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['time'], record.time)

    def test_best_records_limited_to_user(self):
        """
        should test that the retrived records
        are the best records of the authenticated user
        """
        record = Record.objects.create(
            user=self.user, **{**mock_record, 'time': '00:00:01'}
        )
        Record.objects.create(user=self.user, **mock_record)

        res = self.client.get(RECORD_URL, {'best_records': 1})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['time'], record.time)
