from django.contrib.auth.models import Group, User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from model.sequences.sequences import Sequences
from .validators import draw_range_validator, pitch_relation_validator, pitch_sequence_validator, pitch_validator, type_validator, sequence_types_validator


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    repeat_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'repeat_password',
                  'email')

    # password validation
    def validate(self, attrs):
        if attrs['password'] != attrs['repeat_password']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class SequenceSerializer(serializers.Serializer):

    def validate(self, attrs):

        pitch_range_low = attrs["pitch_range_low"]
        pitch_range_high = attrs["pitch_range_high"]
        sequence_types = attrs["sequence_types"]
        type = attrs["type"]

        sequence_types_validator(
            sequence_types, list(Sequences.SEQUENCE_TYPES[type])
        )

        pitch_relation_validator(pitch_range_low, pitch_range_high)

        draw_range_validator(
            sequence_types,
            pitch_range_low,
            pitch_range_high,
            Sequences.SEMITONES,
            type,
            Sequences.SEQUENCE_TYPES,
        )

        return attrs

    pitch_range_low = serializers.CharField(
        required=True,
        validators=[lambda pitch_range_low: pitch_validator(
            pitch_range_low,
            "pitch_range_low",
            list(Sequences.SEMITONES.keys())
        )]
    )

    pitch_range_high = serializers.CharField(
        required=True,
        validators=[lambda pitch_range_high: pitch_validator(
            pitch_range_high,
            "pitch_range_high",
            list(Sequences.SEMITONES.keys())
        )]
    )

    type = serializers.CharField(
        required=True,
        validators=[lambda type: type_validator(
            type, list(Sequences.SEQUENCE_TYPES.keys())
        )]
    )

    sequence_types = serializers.ListField(
        required=True,
    )


class AnswearSerializer(serializers.Serializer):

    def validate(self, attrs):

        sequence_type = attrs["sequence_type"]
        answear_to_check = attrs["answear_to_check"]

        sequence_types_validator(
            [answear_to_check], list(Sequences.SEQUENCE_TYPES[sequence_type])
        )

        return attrs

    sequence_type = serializers.CharField(
        required=True,
        validators=[lambda type: type_validator(
            type,
            list(Sequences.SEQUENCE_TYPES.keys())
        )]
    )

    pitch_sequence = serializers.ListField(
        required=True,
        validators=[lambda pitch_sequence: pitch_sequence_validator(
            pitch_sequence,
            "pitch_sequence",
            list(Sequences.SEMITONES.keys())
        )]
    )

    answear_to_check = serializers.CharField(required=True, )
