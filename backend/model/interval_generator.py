from random import choice
from model.exercise_generator import ExerciseGenerator


class IntervalGenerator(ExerciseGenerator):

    def __init__(self, data):
        super().__init__(data)
        self.interval_types = data['interval_types']

    def draw(self):

        match choice(self.interval_types):
            # match-case for all types, right now sticking only to perfect fifth
            case _:
                out = self.get_sequence(
                    self.SEMITONES[self.pitch_high], self.SEMITONES[self.pitch_low], [4])
                out["ans"] = "P5"

                return out
