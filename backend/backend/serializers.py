from django.contrib.auth.models import Group, User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


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


class ChordSerializer(serializers.Serializer):

    def __validate_pitch(self, pitch: str, type: str, tones: list[str]):
        if len(pitch) < 2 or len(pitch) > 3:
            raise serializers.ValidationError({type: "incorrect pitch format"})
        if pitch[:len(pitch)-1] not in tones:
            raise serializers.ValidationError({type: "incorrect pitch name"})
        if int(pitch[-1]) not in range(0, 9):
            raise serializers.ValidationError(
                {type: "octave range is out of bounds"})

    def validate(self, attrs):

        tones = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
                 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}

        chords = {"minor": 7, "Major": 7, "diminished": 6, "augmented": 8, "minor_6": 7,
                  "Major_6": 7, "diminished_6": 6, "minor_46": 7, "Major_46": 7, "diminished_46": 6, }

        pitch_range_low = attrs["pitch_range_low"]
        pitch_range_high = attrs["pitch_range_high"]
        chord_types = attrs["chord_types"]

        self.__validate_pitch(
            pitch_range_low, "pitch_range_low", list(tones.keys())
        )

        self.__validate_pitch(
            pitch_range_high, "pitch_range_high", list(tones.keys())
        )

        if int(pitch_range_low[-1]) > int(pitch_range_high[-1]):
            raise serializers.ValidationError("lower pitch > higher pitch")

        if len(chord_types) < 1:
            raise serializers.ValidationError(
                {"chord_types": "not enough chords to draw"})

        if any(item not in list(chords.keys()) for item in chord_types):

            raise serializers.ValidationError(
                {"chord_types": "incorrect chord format"}
            )

        octaves = int(pitch_range_high[-1]) - int(pitch_range_low[-1])
        for chord in chord_types:
            if octaves*12 - tones[pitch_range_low[:len(pitch_range_low)-1]] + tones[pitch_range_high[:len(pitch_range_high)-1]] - chords[chord] < 0:
                raise serializers.ValidationError(
                    f'cannot draw {chord} chord from this pitch range'
                )
        return attrs

    pitch_range_low = serializers.CharField(required=True,)
    pitch_range_high = serializers.CharField(required=True,)
    chord_types = serializers.ListField(required=True,)
