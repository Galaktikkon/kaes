from random import choice
from model.sequence_generator import SequenceGenerator


class ExtendedChordGenerator(SequenceGenerator):

    __EXTENDED_CHORDS = {
        "D7": [4, 3, 3], "D7_3": [3, 3, 2], "D7_5": [3, 2, 4], "D7_7": [2, 4, 3]
    }

    def __init__(self, data):
        super().__init__(data)
        self.sequences = data['sequence_types']

    def draw(self):
        return super().draw(self.sequences, self.__EXTENDED_CHORDS)
