const INTERVAL_TYPES: string[] = [
  "Unison",
  "Minor Second",
  "Major Second",
  "Minor Third",
  "Major Third",
  "Perfect Fourth",
  "Tritone",
  "Perfect Fifth",
  "Minor Sixth",
  "Major Sixth",
  "Minor Seventh",
  "Major Seventh",
  "Octave",
];
const INTERVAL_GROUP_NAMES: string[] = ["Simple Intervals"];

const INTERVALS_DEFAULT = {
  sequenceName: "Intervals",
  sequenceTypes: {
    "Simple Intervals": [
      "Unison",
      "Minor Second",
      "Major Second",
      "Minor Third",
      "Major Third",
      "Perfect Fourth",
      "Tritone",
    ],
  },
};

const TRIAD_TYPES: string[] = ["Major", "Minor", "Diminished", "Augmented"];
const TRIAD_GROUP_NAMES: string[] = [
  "Root Position",
  "First Inversion",
  "Second Inversion",
];

const EXTENDED_CHORDS_TYPES: string[] = [
  "Dominant Seven",
  "Minor Dominant Seven",
  "Half Diminished Seventh",
  "Fully Diminished Seventh",
];
const EXTENDED_CHORDS_GROUP_NAMES: string[] = [
  "Root Position",
  "First Inversion",
  "Second Inversion",
  "Third Inversion",
];

export {
  INTERVAL_TYPES,
  INTERVAL_GROUP_NAMES,
  INTERVALS_DEFAULT,
  TRIAD_TYPES,
  TRIAD_GROUP_NAMES,
  EXTENDED_CHORDS_TYPES,
  EXTENDED_CHORDS_GROUP_NAMES,
};
