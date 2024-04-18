from random import choice
from model.sequence_generator import SequenceGenerator


class ChordGenerator(SequenceGenerator):

    __TRIADS = {
        "minor": [3, 4], "Major": [4, 3], "diminished": [3, 3], "augmented": [4, 4], "minor_6": [4, 5],
        "Major_6": [3, 5], "diminished_6": [3, 6], "minor_46": [5, 3], "Major_46": [5, 4], "diminished_46": [6, 3],
    }

    def __init__(self, data):
        super().__init__(data)
        self.sequences = data['sequence_types']

    def draw(self):
        return super().draw(self.sequences, self.__TRIADS)
