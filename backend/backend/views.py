from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework import generics
from .serializers import RegisterSerializer, GroupSerializer, UserSerializer
from rest_framework.views import APIView
from .serializers import RegisterSerializer, GroupSerializer, UserSerializer, ChordSerializer
from rest_framework.response import Response
from rest_framework import status
from model.chord_generator import ChordGenerator


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


class ChordView(APIView):

    def post(self, request, format=None):
        serializer_class = ChordSerializer(data=request.data)
        if serializer_class.is_valid():

            generator = ChordGenerator(serializer_class.data)

            return Response(generator.draw(), status=status.HTTP_200_OK)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
