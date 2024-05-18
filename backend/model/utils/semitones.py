from bidict import bidict


class Semitones:
    __SEMITONES_TYPES = bidict({'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4,
                                'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11})

    @classmethod
    def get_semitone_count(cls, pitch_low, pitch_high) -> int:
        octave_count = int(pitch_high[-1])-int(pitch_low[-1])
        semitones_low = cls.__SEMITONES_TYPES[pitch_low[:len(pitch_low)-1]]
        semitones_high = cls.__SEMITONES_TYPES[pitch_high[:len(pitch_high)-1]]

        return 12*octave_count+semitones_high-semitones_low

    @classmethod
    def get_note_names(cls) -> list[str]:
        return list(cls.__SEMITONES_TYPES.keys())

    @classmethod
    def get_semitones(cls) -> bidict[str, int]:
        return cls.__SEMITONES_TYPES
