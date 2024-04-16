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


def sequence_type_validator(type, avaialable_sequence_types):
    if type not in avaialable_sequence_types:
        raise serializers.ValidationError(
            {
                type:
                    f'incorrect sequence type, available sequence types : {
                        avaialable_sequence_types
                    }'
            }
        )
