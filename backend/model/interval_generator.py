from random import choice
from model.exercise_generator import ExerciseGenerator


class IntervalGenerator(ExerciseGenerator):

    # possible upgrade:  bidict module
    __SEMITONES = {0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#',
                   11: 'B', 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}

    def __init__(self, data):
        super().__init__(data)
        self.interval_types = data['interval_types']

    def draw(self):

        match choice(self.interval_types):
            # match-case for all types, right now sticking only to perfect fifth
            case _:
                out = self.get_sequence(
                    self.__SEMITONES[self.pitch_high], self.__SEMITONES[self.pitch_low], [4])
                out["ans"] = "P5"

                return out
