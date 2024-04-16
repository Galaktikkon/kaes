from random import choice
from model.exercise_generator import ExerciseGenerator


class ExtendedChordGenerator(ExerciseGenerator):

    def __init__(self, data):
        super().__init__(data)
        self.extended_chord_types = data['sequence_types']

    def draw(self):

        match choice(self.extended_chord_types):
            # match-case for all types, right now sticking only to D7
            case _:
                out = self.get_sequence(
                    self.SEMITONES[self.pitch_high], self.SEMITONES[self.pitch_low], [4, 3, 3])
                out["ans"] = "D7"

                return out
