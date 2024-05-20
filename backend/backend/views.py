import json
import os
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from model.utils.semitones import Semitones
from .serializers import UserSerializer, RegisterSerializer, GroupSerializer, SequenceSerializer, AnswearSerializer, UserStatsSerializer, UserStatsQuerySerializer
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


class AnswearCheckView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        answear_parameters_serializer_class = AnswearSerializer(
            data=request.data
        )

        if answear_parameters_serializer_class.is_valid():

            result, correct_answear = AnswearTester(
                answear_parameters_serializer_class.data
            ).test_answear()

            if request.user.is_authenticated:
                data = request.data.copy()
                data["user"] = request.user.id
                data["result"] = result["result"]
                data["sequence_type"] = correct_answear
                del data["pitch_sequence"]
                del data["answear_to_check"]

                user_stats_serializer_class = UserStatsSerializer(data=data)
                if user_stats_serializer_class.is_valid():
                    user_stats_serializer_class.save()
                else:
                    Response(
                        user_stats_serializer_class.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    )

            return Response(result)

        return Response(answear_parameters_serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


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

            user_stats_serializer_class = UserStatsSerializer(
                queryset,
                many=True
            )

            return Response({"data": RechartsDataTransformer.get_transformed_data(user_stats_serializer_class.data)})

        return Response(query_params_serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


class LoadConfigView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, _):

        path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__), '..', "config"
            )
        )

        with open(os.path.join(path, "config.json"), "r") as f:

            data = json.load(f)

            instruments = data["Instruments"]["Types"]

            for instrument in instruments:

                pitch_range_low = instruments[instrument][0]
                pitch_range_high = instruments[instrument][1]

                scale = Semitones.generate_scale(
                    pitch_range_low, pitch_range_high)

                data["Instruments"]["Ranges"][instrument] = scale

        return Response(data)
