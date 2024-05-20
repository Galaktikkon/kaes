from bidict import bidict


class Sequences:
    __SEQUENCE_TYPES = {
        "intervals": bidict({
            "U": (0,), "m2": (1,), "M2": (2,), "m3": (3,), "M3": (4,), "P4": (5,),
            "TT": (6,), "P5": (7,), "m6": (8,), "M6": (9,), "m7": (10,), "M7": (11,), "P8": (12,)
        }), "triads": bidict({
            "minor": (3, 4), "major": (4, 3), "diminished": (3, 3), "augmented": (4, 4),
            "minor_6": (4, 5), "major_6": (3, 5), "diminished_6": (3, 6),
            "minor_46": (5, 3), "major_46": (5, 4), "diminished_46": (6, 3),
        }), "seventh_chords": bidict({
            "D7": (4, 3, 3), "D7_3": (3, 3, 2), "D7_5": (3, 2, 4), "D7_7": (2, 4, 3),
            "min7": (3, 4, 3), "m7b5": (3, 3, 4), "dim7": (3, 3, 3)
        }),
    }

    @classmethod
    def get_type_dict(cls, type):
        return cls.__SEQUENCE_TYPES[type]

    @classmethod
    def get_available_sequence_types(cls, type):
        return list(cls.__SEQUENCE_TYPES[type].keys())

    @classmethod
    def get_available_group_types(cls):
        return list(cls.__SEQUENCE_TYPES.keys())
