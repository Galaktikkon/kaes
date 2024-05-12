from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, RegisterSerializer, GroupSerializer, SequenceSerializer, AnswearSerializer, UserStatisticsSerializer
from model.sequence_generator import SequenceGenerator
from model.answear_tester import AnswearTester
import jwt


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
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class ChordView(APIView):

    def post(self, request, format=None):
        serializer_class = SequenceSerializer(data=request.data)
        if serializer_class.is_valid():

            return Response(SequenceGenerator(serializer_class.data).draw_triad(), status=status.HTTP_200_OK)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


class IntervalView(APIView):

    def post(self, request, format=None):
        serializer_class = SequenceSerializer(data=request.data)
        if serializer_class.is_valid():

            return Response(SequenceGenerator(serializer_class.data).draw_interval(), status=status.HTTP_200_OK)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


class SeventhChordView(APIView):

    def post(self, request, format=None):
        serializer_class = SequenceSerializer(data=request.data)
        if serializer_class.is_valid():

            return Response(SequenceGenerator(serializer_class.data).draw_seventh_chord(), status=status.HTTP_200_OK)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswearCheckView(APIView):
    def post(self, request, format=None):
        serializer_class = AnswearSerializer(data=request.data)
        if serializer_class.is_valid():

            return Response(AnswearTester(serializer_class.data).test_answear(), status=status.HTTP_200_OK)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


class UserStatisticsSave(generics.CreateAPIView):
    serializer_class = UserStatisticsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print(request.headers)
        auth_header = request.headers.get("Authorization")

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split()[1]

            try:
                jwt_data = jwt.decode(
                    token, options={"verify_signature": False}
                )
                return Response(jwt_data)
            except jwt.InvalidTokenError:
                return Response({'error': 'Invalid token'}, status=400)
        else:
            return Response({'error': 'Authorization header is missing or malformed'}, status=400)
