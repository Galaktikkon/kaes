from model.utils.sequences import Sequences
from model.utils.semitones import Semitones


class AnswearTester:

    def __init__(self, data):
        self.exercise_type = data["exercise_type"]
        self.pitch_sequence = data["pitch_sequence"]
        self.answear_to_check = data["answear_to_check"]
        self.__types = Sequences.get_type_dict(
            self.exercise_type
        )

    def test_answear(self):
        user_sequence = self.__types[self.answear_to_check]
        correct_sequence = self.__get_sequence_from_pitches(
            self.pitch_sequence
        )

        correct_answear = self.__types.inverse[tuple(correct_sequence)]

        return {"result": user_sequence == tuple(correct_sequence)}, correct_answear

    def __get_sequence_from_pitches(self, pitch_sequence):

        return [
            Semitones.get_semitone_count(
                pitch_sequence[i],
                pitch_sequence[i+1]
            )
            for i in range(len(pitch_sequence)-1)
        ]
