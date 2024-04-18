from random import choice
from model.sequence_generator import SequenceGenerator


class IntervalGenerator(SequenceGenerator):

    __INTERVALS = {
        "U": [0], "m2": [1], "M2": [2], "m3": [3], "M3": [4], "P4": [5],
        "TT": [6], "P5": [7], "m6": [8], "M6": [9], "m7": [10], "M7": [11], "P8": [12]
    }

    def __init__(self, data):
        super().__init__(data)
        self.sequences = data['sequence_types']

    def draw(self):
        return super().draw(self.sequences, self.__INTERVALS)
