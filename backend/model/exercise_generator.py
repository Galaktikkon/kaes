from random import randint


class ExerciseGenerator:

    # possible upgrade:  bidict module
    __SEMITONES = {0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#',
                   11: 'B', 'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}

    __COMPONENTS = {1: "first", 2: "second",
                    3: "third", 4: "fourth", 4: "fifth"}

    def __init__(self, data):
        self.pitch_low = data['pitch_range_low'][:len(
            data['pitch_range_low'])-1]
        self.pitch_high = data['pitch_range_high'][:len(
            data['pitch_range_high'])-1]
        self.octave_low = int(data['pitch_range_low'][-1])
        self.octave_high = int(data['pitch_range_high'][-1])

    def get_sequence(self, high, low, intervals):

        octaves = self.octave_high - self.octave_low

        semitone_count = self.__get_semitone_count(high, low, octaves*12)
        draw = randint(0, semitone_count - sum(intervals))

        root = (draw + low) % 12

        first = self.__SEMITONES[root]
        octave_no = self.octave_low

        if self.__SEMITONES[self.pitch_low] + draw > 11:
            octave_no += 1

        sequence = {'first': first+str(octave_no)}

        ptr = root
        for i, interval in enumerate(intervals):

            octave_no = octave_no+1 if ptr+interval > 11 else octave_no

            sequence[self.__COMPONENTS[i+2]
                     ] = self.__SEMITONES[(ptr+interval) % 12] + str(octave_no)

            ptr %= 12

        return sequence

    def __get_semitone_count(self, high, low, semitones):
        return semitones - low + high
