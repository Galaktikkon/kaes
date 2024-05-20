from model.utils.sequences import Sequences
from model.utils.semitones import Semitones


class AnswearTester:

    def __init__(self, data):
        self.exercise_type = data["exercise_type"]
        self.pitch_sequence = data["pitch_sequence"]
        self.answear_to_check = data["answear_to_check"]

    def test_answear(self):
        user_sequence = Sequences.get_type_dict(
            self.exercise_type
        )[self.answear_to_check]
        correct_sequence = self.__get_sequence_from_pitches(
            self.pitch_sequence
        )

        return {"result": list(user_sequence) == correct_sequence}

    def __get_sequence_from_pitches(self, pitch_sequence):

        return [
            Semitones.get_semitone_count(
                pitch_sequence[i],
                pitch_sequence[i+1]
            )
            for i in range(len(pitch_sequence)-1)
        ]
