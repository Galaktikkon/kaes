from django.contrib.auth.models import Group, User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .validators import pitch_validator, sequence_type_validator


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

    __TONES = {
        'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
        'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
    }

    __SEQUENCE_TYPES = {
        "interval": {
            "U": 0, "m2": 1, "M2": 2, "m3": 3, "M3": 4, "P4": 5,
            "TT": 6, "P5": 7, "m6": 8, "M6": 9, "m7": 10, "M7": 11, "P8": 12
        }, "triad": {
            "minor": 7, "Major": 7, "diminished": 6, "augmented": 8, "minor_6": 7,
            "Major_6": 7, "diminished_6": 6, "minor_46": 7, "Major_46": 7, "diminished_46": 6,
        }, "extended_chord": {
            "D7": 10, "D7_3": 8, "D7_5": 9, "D7_7": 9
        },
    }

    def __sequence_types_validator(self, sequence_types, available_sequences):

        errors = {}

        if len(sequence_types) < 1:
            errors.update({sequence_types: "not enough sequences to draw"})

        if any(item not in available_sequences for item in sequence_types):
            errors.update({sequence_types: "incorrect sequence format"})

        if errors:
            raise serializers.ValidationError(errors)

    def validate(self, attrs):

        pitch_range_low = attrs["pitch_range_low"]
        pitch_range_high = attrs["pitch_range_high"]
        sequence_types = attrs["sequence_types"]
        type = attrs["type"]

        self.__sequence_types_validator(
            sequence_types, list(self.__SEQUENCE_TYPES[type])
        )

        if int(pitch_range_low[-1]) > int(pitch_range_high[-1]):
            raise serializers.ValidationError(
                {"incorrect pitch values": "lower pitch limit > higher pitch limit"}
            )

        semitones = (int(pitch_range_high[-1]) - int(pitch_range_low[-1]))*12
        pitch_name_high = pitch_range_high[:len(pitch_range_high)-1]
        pitch_name_low = pitch_range_low[:len(pitch_range_low)-1]

        for sequence in sequence_types:
            if semitones - self.__TONES[pitch_name_low] + self.__TONES[pitch_name_high] - self.__SEQUENCE_TYPES[type][sequence] < 0:
                raise serializers.ValidationError(
                    f'cannot draw {sequence} chord from this pitch range'
                )

        return attrs

    pitch_range_low = serializers.CharField(
        required=True,
        validators=[lambda pitch_range_low: pitch_validator(
            pitch_range_low,
            "pitch_range_low",
            SequenceSerializer.__TONES
        )]
    )

    pitch_range_high = serializers.CharField(
        required=True,
        validators=[lambda pitch_range_high: pitch_validator(
            pitch_range_high,
            "pitch_range_high",
            SequenceSerializer.__TONES
        )]
    )

    type = serializers.CharField(
        required=True,
        validators=[lambda type: sequence_type_validator(
            type, list(SequenceSerializer.__SEQUENCE_TYPES.keys())
        )]
    )

    sequence_types = serializers.ListField(
        required=True,
    )
