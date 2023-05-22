from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User
from .serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    user_serialized = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.username = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    return Response(user_serialized.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    user_serialized = UserSerializer(user, many=False)
    return Response(user_serialized.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(requests):
    users = User.objects.all()
    product_serialized = UserSerializer(users, many=True)
    return Response(product_serialized.data)


@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)