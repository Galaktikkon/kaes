from random import choice
from model.exercise_generator import ExerciseGenerator


class ChordGenerator(ExerciseGenerator):

    def __init__(self, data):
        super().__init__(data)
        self.chord_types = data['chord_types']

    def draw(self):

        match choice(self.chord_types):
            # match-case for all types, right now sticking only to minor chord
            case _:
                out = self.get_sequence(
                    self.SEMITONES[self.pitch_high], self.SEMITONES[self.pitch_low], [3, 4])
                out["ans"] = "minor"

                return out
