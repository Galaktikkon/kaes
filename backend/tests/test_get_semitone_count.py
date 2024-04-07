from model.interval_generator import IntervalGenerator
import unittest


class TestGetSemitoneCount(unittest.TestCase):

    def test_same_pitch(self):

        data = {
            "pitch_range_low": "",
            "pitch_range_high": "",
            "interval_types": ""
        }

        generator = IntervalGenerator(data)

        assert (generator.__get_semitone_count(1, 1, 0)) == 0


if __name__ == '__main__':
    unittest.main()
