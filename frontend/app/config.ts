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
] as const;
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

const TRIAD_DEFAULT = {
  sequenceName: "Triads",
  sequenceTypes: {
    "Root Position": ["Major", "Minor", "Diminished", "Augmented"],
  },
};

const SEVEN_CHORDS_TYPES: string[] = [
  "Dominant Seven",
  "Minor Dominant Seven",
  "Half Diminished Seventh",
  "Fully Diminished Seventh",
];
const SEVEN_CHORDS_GROUP_NAMES: string[] = [
  "Root Position",
  "First Inversion",
  "Second Inversion",
  "Third Inversion",
];

const SEVEN_CHORDS_DEFAULT = {
  sequenceName: "SEVEN Chords",
  sequenceTypes: {
    "Root Position": [
      "Dominant Seven",
      "Minor Dominant Seven",
      "Half Diminished Seventh",
      "Fully Diminished Seventh",
    ],
  },
};

const PIANO_KEYS = ["A0", "A#0", "B0"].concat(
  Array.from({ length: 6 }, (_, i) => [
    `C${i + 1}`,
    `C#${i + 1}`,
    `D${i + 1}`,
    `D#${i + 1}`,
    `E${i + 1}`,
    `F${i + 1}`,
    `F#${i + 1}`,
    `G${i + 1}`,
    `G#${i + 1}`,
    `A${i + 1}`,
    `A#${i + 1}`,
    `H${i + 1}`,
  ])
    .flat()
    .concat(["C8"])
);

export {
  INTERVAL_TYPES,
  INTERVAL_GROUP_NAMES,
  INTERVALS_DEFAULT,
  TRIAD_TYPES,
  TRIAD_GROUP_NAMES,
  TRIAD_DEFAULT,
  SEVEN_CHORDS_TYPES,
  SEVEN_CHORDS_GROUP_NAMES,
  SEVEN_CHORDS_DEFAULT,
  PIANO_KEYS,
};
