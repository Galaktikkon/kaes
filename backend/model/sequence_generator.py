from random import choice, randint
from model.utils.sequences import Sequences
from model.utils.semitones import Semitones


class SequenceGenerator:

    def __init__(self, data):
        self.pitch_range_low = data['pitch_range_low']
        self.pitch_range_high = data['pitch_range_high']
        self.sequence_types = data["sequence_types"]

        self.__SEMITONES = Semitones.get_semitones()

    def draw_interval(self):
        return self.__get_sequence(
            self.pitch_range_low,
            self.pitch_range_high,
            Sequences.get_type_dict("intervals")[choice(self.sequence_types)]
        )

    def draw_triad(self):
        return self.__get_sequence(
            self.pitch_range_low,
            self.pitch_range_high,
            Sequences.get_type_dict("triads")[choice(self.sequence_types)]
        )

    def draw_seventh_chord(self):
        return self.__get_sequence(
            self.pitch_range_low,
            self.pitch_range_high,
            Sequences.get_type_dict("seventh_chords")[
                choice(self.sequence_types)]
        )

    def __get_sequence(self, pitch_range_low, pitch_range_high, intervals):

        pitch_low, octave_low = self.__split_pitch_range(pitch_range_low)

        draw = self.__draw_root_pitch(
            intervals, pitch_range_low, pitch_range_high
        )

        root = (draw + self.__SEMITONES[pitch_low]) % 12

        first = self.__SEMITONES.inverse[root]
        octave_no = octave_low

        if self.__SEMITONES[pitch_low] + draw > 11:
            octave_no += 1

        sequence = {'sequence': [first+str(octave_no)]}

        ptr = root
        for interval in intervals:

            octave_no = octave_no+1 if ptr % 12 + interval > 11 else octave_no
            ptr += interval
            sequence['sequence'].append(
                self.__SEMITONES.inverse[(ptr) % 12] + str(octave_no)
            )

        return sequence

    def __draw_root_pitch(self, intervals, pitch_range_low, pitch_range_high):

        semitone_count = Semitones.get_semitone_count(
            pitch_range_low,
            pitch_range_high
        )

        return randint(0, semitone_count - sum(intervals))

    def __split_pitch_range(self, pitch_range: str):
        octave = int(pitch_range[len(pitch_range)-1])
        pitch = pitch_range[:len(pitch_range)-1]
        return pitch, octave
