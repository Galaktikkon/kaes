from random import randint, choice


class IntervalGenerator:

    # possible upgrade:  bidict module
    __SEMITONES = {0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#',
                   11: 'B', 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}

    def __init__(self, data):
        self.pitch_low = data['pitch_range_low'][:len(
            data['pitch_range_low'])-1]
        self.pitch_high = data['pitch_range_high'][:len(
            data['pitch_range_high'])-1]
        self.octave_low = int(data['pitch_range_low'][-1])
        self.octave_high = int(data['pitch_range_high'][-1])
        self.interval_types = data['interval_types']

    def draw(self):

        match choice(self.interval_types):
            # match-case for all types, right now sticking only to perfect fifth
            case _:
                out = self.__get_interval(
                    self.__SEMITONES[self.pitch_high], self.__SEMITONES[self.pitch_low], 7)
                out["ans"] = "P5"

                return out

    def __get_interval(self, high, low, interval):

        octaves = self.octave_high - self.octave_low

        semitone_count = self.__get_semitone_count(high, low, octaves*12)

        draw = randint(0, semitone_count - interval)

        root = (draw + low) % 12

        first = self.__SEMITONES[root]
        second = self.__SEMITONES[(root + interval) % 12]

        out = {'first': first+str(self.octave_low)}

        out["second"] = second+str(self.octave_low+1) if root + \
            interval > 11 else second+str(self.octave_low)

        return out

    # testing private method?
    def __get_semitone_count(self, high, low, semitones):
        return semitones - low + high
