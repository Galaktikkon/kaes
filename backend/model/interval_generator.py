from random import choice
from model.exercise_generator import ExerciseGenerator


class IntervalGenerator(ExerciseGenerator):

    intervals = {"U": 0, "m2": 1, "M2": 2, "m3": 3, "M3": 4, "P4": 5,
                 "TT": 6, "P5": 7, "m6": 8, "M6": 9, "m7": 10, "M7": 11, "P8": 12}

    def __init__(self, data):
        super().__init__(data)
        self.interval_types = data['interval_types']

    def draw(self):

        drawn_interval = choice(self.interval_types)

        out = self.get_sequence(
            self.SEMITONES[self.pitch_high], self.SEMITONES[self.pitch_low], [self.intervals[drawn_interval]])
        out["ans"] = drawn_interval

        return out
