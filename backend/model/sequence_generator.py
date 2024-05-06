from random import choice, randint
from model.sequences.intervals import Intervals
from model.sequences.triads import Triads
from model.sequences.seventh_chords import SeventhChords


class SequenceGenerator():

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
        self.sequences = data["sequence_types"]

    def draw_interval(self):
        return self.__get_sequence(
            self.__SEMITONES[self.pitch_high],
            self.__SEMITONES[self.pitch_low],
            Intervals[choice(self.sequences)].value
        )

    def draw_triad(self):
        return self.__get_sequence(
            self.__SEMITONES[self.pitch_high],
            self.__SEMITONES[self.pitch_low],
            Triads[choice(self.sequences)].value
        )

    def draw_seventh_chord(self):
        return self.__get_sequence(
            self.__SEMITONES[self.pitch_high],
            self.__SEMITONES[self.pitch_low],
            SeventhChords[choice(self.sequences)].value
        )

    def __get_sequence(self, high, low, intervals):

        draw = self.__draw_root_pitch(high, low, intervals)

        root = (draw + low) % 12

        first = self.__SEMITONES[root]
        octave_no = self.octave_low

        if self.__SEMITONES[self.pitch_low] + draw > 11:
            octave_no += 1

        sequence = {'sequence': [first+str(octave_no)]}

        ptr = root
        for interval in intervals:

            octave_no = octave_no+1 if ptr % 12 + interval > 11 else octave_no
            ptr += interval
            sequence['sequence'].append(
                self.__SEMITONES[(ptr) % 12] + str(octave_no)
            )

        return sequence

    def __draw_root_pitch(self, high, low, intervals):

        octaves = self.octave_high - self.octave_low

        semitone_count = self.__get_semitone_count(high, low, octaves*12)

        return randint(0, semitone_count - sum(intervals))

    def __get_semitone_count(self, high, low, semitones):
        return semitones - low + high
