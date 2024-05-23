from rest_framework.serializers import ValidationError
from django.contrib.auth.models import User

from .get_config_data import get_config_data
from model.utils.semitones import Semitones


def pitch_validator(pitch, type, tones):

    errors = {}

    if len(pitch) < 2 or len(pitch) > 3:
        errors.update({type: "incorrect pitch format"})
    if pitch[:len(pitch)-1] not in tones:
        errors.update({type: "incorrect pitch name"})
    if int(pitch[-1]) not in range(0, 9):
        errors.update({type: "octave range is out of bounds"})

    if errors:
        raise ValidationError(errors)


def pitch_sequence_validator(pitch_sequence, type, tones):
    for i, pitch in enumerate(pitch_sequence):
        pitch_validator(pitch, f'{type}, idx: {i}', tones)


def type_validator(type, avaialable_sequence_types):
    if type not in avaialable_sequence_types:
        raise ValidationError(
            {
                type:
                    f'incorrect sequence type, available sequence types : {
                        avaialable_sequence_types
                    }'
            }
        )


def sequence_types_validator(sequence_types, available_sequences):

    errors = {}

    if len(sequence_types) < 1:
        errors.update({"sequence_types": "not enough sequences to draw"})

    if any(item not in available_sequences for item in sequence_types):
        errors.update({"sequence_types": "incorrect sequence format"})

    if errors:
        raise ValidationError(errors)


def pitch_relation_validator(pitch_range_low, pitch_range_high, tones):

    pitch_low, octave_low = Semitones.split_pitch_range(pitch_range_low)
    pitch_high, octave_high = Semitones.split_pitch_range(pitch_range_high)

    if octave_low > octave_high or (octave_low == octave_high and tones.inverse[pitch_low] > tones.inverse[pitch_high]):
        raise ValidationError(
            {"incorrect pitch values": "lower pitch limit > higher pitch limit"}
        )


def draw_range_validator(sequence_types, pitch_range_low, pitch_range_high, tones, available_types):

    semitones = (int(pitch_range_high[-1]) - int(pitch_range_low[-1]))*12
    pitch_name_high = pitch_range_high[:len(pitch_range_high)-1]
    pitch_name_low = pitch_range_low[:len(pitch_range_low)-1]

    for sequence in sequence_types:
        if semitones - tones[pitch_name_low] + tones[pitch_name_high] - sum(available_types[sequence]) < 0:
            raise ValidationError(
                f'cannot draw {sequence} chord from this pitch range'
            )


def note_duration_validator(note_duration):
    note_durations = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
    if note_duration not in note_durations:
        raise ValidationError(
            f'Invalid note duration! Available note durations: {
                note_durations
            }'
        )


def user_id_validator(user_id):
    if not User.objects.filter(id=user_id).exists():

        raise ValidationError(
            f'User of id={user_id} does not exist!'
        )


def query_param_validator(query_param):
    config = get_config_data()
    available_query_params = config["Stats query params"].keys()
    if query_param not in available_query_params:
        raise ValidationError(
            "Invalid query parameter! Avaiable query parametrs: ", available_query_params
        )


def date_range_validator(start_date, end_date):
    if start_date > end_date:
        raise ValidationError("Start date > End date")
