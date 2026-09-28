from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AuthAPITests(APITestCase):
    def test_register_business_success(self):
        payload = {
            "full_name": "Jane Business",
            "email": "business@example.com",
            "phone": "+123456789",
            "password": "strongpass123",
            "confirm_password": "strongpass123",
            "role": "BUSINESS",
        }

        response = self.client.post(reverse("register"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="business@example.com").exists())
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_duplicate_email_is_rejected(self):
        User.objects.create_user(
            email="duplicate@example.com",
            full_name="Existing User",
            phone="123",
            role="BUSINESS",
            password="strongpass123",
        )

        payload = {
            "full_name": "Another User",
            "email": "duplicate@example.com",
            "phone": "+123456789",
            "password": "strongpass123",
            "confirm_password": "strongpass123",
            "role": "BUSINESS",
        }

        response = self.client.post(reverse("register"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_returns_tokens(self):
        User.objects.create_user(
            email="login@example.com",
            full_name="Login User",
            phone="123",
            role="BUSINESS",
            password="strongpass123",
        )

        response = self.client.post(
            reverse("login"),
            {"email": "login@example.com", "password": "strongpass123"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["user"]["email"], "login@example.com")

    def test_profile_requires_authentication(self):
        response = self.client.get(reverse("profile"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
