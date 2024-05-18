from rest_framework import serializers


def pitch_validator(pitch, type, tones):

    errors = {}

    if len(pitch) < 2 or len(pitch) > 3:
        errors.update({type: "incorrect pitch format"})
    if pitch[:len(pitch)-1] not in tones:
        errors.update({type: "incorrect pitch name"})
    if int(pitch[-1]) not in range(0, 9):
        errors.update({type: "octave range is out of bounds"})

    if errors:
        raise serializers.ValidationError(errors)


def pitch_sequence_validator(pitch_sequence, type, tones):
    for i, pitch in enumerate(pitch_sequence):
        pitch_validator(pitch, f'{type}, idx: {i}', tones)


def type_validator(type, avaialable_sequence_types):
    if type not in avaialable_sequence_types:
        raise serializers.ValidationError(
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
        raise serializers.ValidationError(errors)


def pitch_relation_validator(pitch_range_low, pitch_range_high):
    if int(pitch_range_low[-1]) > int(pitch_range_high[-1]):
        raise serializers.ValidationError(
            {"incorrect pitch values": "lower pitch limit > higher pitch limit"}
        )


def draw_range_validator(sequence_types, pitch_range_low, pitch_range_high, tones, available_types):

    semitones = (int(pitch_range_high[-1]) - int(pitch_range_low[-1]))*12
    pitch_name_high = pitch_range_high[:len(pitch_range_high)-1]
    pitch_name_low = pitch_range_low[:len(pitch_range_low)-1]

    for sequence in sequence_types:
        if semitones - tones[pitch_name_low] + tones[pitch_name_high] - sum(available_types[sequence]) < 0:
            raise serializers.ValidationError(
                f'cannot draw {sequence} chord from this pitch range'
            )
