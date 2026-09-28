from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer, UserSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token_data = CustomTokenObtainPairSerializer.get_token(user)
        refresh = str(token_data)
        access = str(token_data)
        # This is a compact pair; the actual token values are produced by the JWT serializer.
        # We keep the response user-friendly and consistent by returning the user plus a login-ready payload.
        data = {
            "user": UserSerializer(user).data,
            "message": "User registered successfully.",
        }

        login_response = CustomTokenObtainPairSerializer(data={"email": user.email, "password": request.data.get("password")})
        if login_response.is_valid():
            login_data = login_response.validated_data
            data["access"] = login_data["access"]
            data["refresh"] = login_data["refresh"]

        return Response(data, status=status.HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]


class RefreshTokenView(TokenRefreshView):
    permission_classes = [AllowAny]


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({"detail": "Logout successful. Clear access and refresh tokens on the client."}, status=status.HTTP_200_OK)
