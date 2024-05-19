from django.contrib.auth.models import Group, User
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework import permissions, viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, RegisterSerializer, GroupSerializer, SequenceSerializer, AnswearSerializer, UserStatisticsSerializer, UserStatsQuerySerializer
from model.sequence_generator import SequenceGenerator
from model.answear_tester import AnswearTester
from backend.models import UserStatistics
from backend.utils.recharts_data_transformer import RechartsDataTransformer


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
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        data = request.data.copy()
        data['user'] = request.user.id

        serializer_class = UserStatisticsSerializer(data=data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(request.data)

        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


class UserStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def filter_data(self, queryset, query_params):
        start_date = query_params.get('start_date')
        end_date = query_params.get('end_date')
        exercise_type = query_params.get('exercise_type')
        instrument = query_params.get('instrument')
        note_duration = query_params.get('note_duration')

        if start_date and end_date:
            queryset = queryset.filter(date__range=[start_date, end_date])
        if exercise_type:
            queryset = queryset.filter(exercise_type=exercise_type)
        if instrument:
            queryset = queryset.filter(instrument=instrument)
        if note_duration:
            queryset = queryset.filter(note_duration=note_duration)

        return queryset.order_by('date')

    def get(self, request):

        query_params_serializer_class = UserStatsQuerySerializer(
            data=request.query_params
        )

        if query_params_serializer_class.is_valid():
            user = request.user
            queryset = UserStatistics.objects.filter(user=user)

            queryset = self.filter_data(
                queryset, query_params_serializer_class.validated_data
            )

            user_stats_serializer_class = UserStatisticsSerializer(
                queryset,
                many=True
            )

            return Response({"data": RechartsDataTransformer.get_transformed_data(user_stats_serializer_class.data)})

        return Response(query_params_serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
