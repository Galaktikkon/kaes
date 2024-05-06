from enum import Enum


class Triads(Enum):
    minor = [3, 4]
    major = [4, 3]
    diminished = [3, 3]
    augmented = [4, 4]
    minor_6 = [4, 5]
    major_6 = [3, 5]
    diminished_6 = [3, 6]
    minor_46 = [5, 3]
    major_46 = [5, 4]
    diminished_46 = [6, 3]
