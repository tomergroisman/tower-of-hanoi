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

RECORD_URL = reverse('record:user-list')
LEADERBOARD_URL = reverse('record:leaderboard-list')

mock_record = {
    'level':  1,
    'moves': 7,
    'time': '00:00:15',
}


def create_mock_record(user, **params):
    """Create and return a mock record"""
    mock_record.update(params)

    return Record.objects.create(user=user, **mock_record)


class PrivateIngredientsApiTests(TestCase):
    """Private record api tests (authenticated)"""

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
        results = res.data['results']

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['time'], record.time)

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
        results = res.data['results']

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['time'], record.time)

    def test_retrive_leaderboard_records_list(self):
        """should retrive the users leaderboard list"""
        user_2 = get_user_model().objects.create_user('2@test.com', '12345')

        create_mock_record(user=self.user)
        create_mock_record(user=user_2)
        best_user_2 = create_mock_record(user=user_2, time='00:00:00')

        res = self.client.get(LEADERBOARD_URL)
        results = res.data['results']

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(results), 2)
        self.assertEqual(results[0]['nickname'], '2@test.com')
        self.assertEqual(results[1]['nickname'], self.user.nickname)
        self.assertEqual(results[0]['time'], best_user_2.time)
