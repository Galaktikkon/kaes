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


class IntervalSerializer(serializers.Serializer):

    def __validate_pitch(self, pitch: str, type: str, tones: list[str]):
        if len(pitch) < 2 or len(pitch) > 3:
            raise serializers.ValidationError({type: "incorrect pitch format"})
        if pitch[:len(pitch)-1] not in ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]:
            raise serializers.ValidationError({type: "incorrect pitch name"})
        if int(pitch[-1]) not in range(0, 9):
            raise serializers.ValidationError(
                {type: "octave range is out of bounds"})

    def validate(self, attrs):

        tones = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
                 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}

        intervals = {"U": 0, "m2": 1, "M2": 2, "m3": 3, "M3": 4, "P4": 5,
                     "TT": 6, "P5": 7, "m6": 8, "M6": 9, "m7": 10, "M7": 11, "P8": 12}

        pitch_range_low = attrs["pitch_range_low"]
        pitch_range_high = attrs["pitch_range_high"]
        interval_types = attrs["interval_types"]

        self.__validate_pitch(
            pitch_range_low, "pitch_range_low", list(tones.keys())
        )

        self.__validate_pitch(
            pitch_range_high, "pitch_range_high", list(tones.keys())
        )

        if int(pitch_range_low[-1]) > int(pitch_range_high[-1]):
            raise serializers.ValidationError("lower pitch > higher pitch")

        if len(interval_types) < 1:
            raise serializers.ValidationError(
                {"interval_types": "not enough intervals to draw"})

        if any(item not in list(intervals.keys()) for item in interval_types):

            raise serializers.ValidationError(
                {"interval_types": "incorrect interval format"}
            )

        octaves = int(pitch_range_high[-1]) - int(pitch_range_low[-1])
        for interval in interval_types:
            if octaves*12 - tones[pitch_range_low[:len(pitch_range_low)-1]] + tones[pitch_range_high[:len(pitch_range_high)-1]] - intervals[interval] < 0:
                raise serializers.ValidationError(
                    f'cannot draw {interval} from this pitch range'
                )
        return attrs

    pitch_range_low = serializers.CharField(required=True,)
    pitch_range_high = serializers.CharField(required=True,)
    interval_types = serializers.ListField(required=True,)


class ExtendedChordSerializer(serializers.Serializer):

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

        extended_chords = {"D7": 10, "D7_3": 8, "D7_5": 9, "D7_7": 9}

        pitch_range_low = attrs["pitch_range_low"]
        pitch_range_high = attrs["pitch_range_high"]
        extended_chord_types = attrs["extended_chord_types"]

        self.__validate_pitch(
            pitch_range_low, "pitch_range_low", list(tones.keys())
        )

        self.__validate_pitch(
            pitch_range_high, "pitch_range_high", list(tones.keys())
        )

        if int(pitch_range_low[-1]) > int(pitch_range_high[-1]):
            raise serializers.ValidationError("lower pitch > higher pitch")

        if len(extended_chord_types) < 1:
            raise serializers.ValidationError(
                {"chord_types": "not enough chords to draw"})

        if any(item not in list(extended_chords.keys()) for item in extended_chord_types):

            raise serializers.ValidationError(
                {"chord_types": "incorrect chord format"}
            )

        octaves = int(pitch_range_high[-1]) - int(pitch_range_low[-1])
        for extended_chord in extended_chord_types:
            if octaves*12 - tones[pitch_range_low[:len(pitch_range_low)-1]] + tones[pitch_range_high[:len(pitch_range_high)-1]] - extended_chords[extended_chord] < 0:
                raise serializers.ValidationError(
                    f'cannot draw {extended_chord} chord from this pitch range'
                )
        return attrs

    pitch_range_low = serializers.CharField(required=True,)
    pitch_range_high = serializers.CharField(required=True,)
    extended_chord_types = serializers.ListField(required=True,)
