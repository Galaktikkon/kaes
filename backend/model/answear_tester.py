from model.sequences.intervals import Intervals
from model.sequences.triads import Triads
from model.sequences.seventh_chords import SeventhChords


class AnswearTester():
    __SEMITONES = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4,
                   'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}

    __SEQUENCE_TYPES = {
        "intervals": Intervals,
        "triads": Triads,
        "seventh_chords": SeventhChords,
    }

    def __init__(self, data):
        self.sequence_type = data["sequence_type"]
        self.pitch_sequence = data["pitch_sequence"]
        self.answear_to_check = data["answear_to_check"]

    def test_answear(self):
        user_sequence = self.__SEQUENCE_TYPES[self.sequence_type][self.answear_to_check].value
        correct_sequence = self.__get_sequence_from_pitches(
            self.pitch_sequence
        )
        return {"result": user_sequence == correct_sequence}

    def __get_sequence_from_pitches(self, pitch_sequence):

        return [
            self.__get_semitones_count(
                pitch_sequence[i],
                pitch_sequence[i+1]
            )
            for i in range(len(pitch_sequence)-1)
        ]

    def __get_semitones_count(self, pitch_low, pitch_high):
        octave_count = int(pitch_high[-1])-int(pitch_low[-1])
        semitones_low = self.__SEMITONES[pitch_low[:len(pitch_low)-1]]
        semitones_high = self.__SEMITONES[pitch_high[:len(pitch_high)-1]]

        return 12*octave_count+semitones_high-semitones_low
