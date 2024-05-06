const SEQUENCE_TYPES: {
  [sequence: string]: { [groupName: string]: { [type: string]: string } };
} = {
  Intervals: {
    "Simple Intervals": {
      Unison: "U",
      "Minor Second": "m2",
      "Major Second": "M2",
      "Minor Third": "m3",
      "Major Third": "M3",
      "Perfect Fourth": "P4",
      Tritone: "TT",
      "Perfect Fifth": "P5",
      "Minor Sixth": "m6",
      "Major Sixth": "M6",
      "Minor Seventh": "m7",
      "Major Seventh": "M7",
      Octave: "P8",
    },
  },
  Triads: {
    "Root Position": {
      Major: "major",
      Minor: "minor",
      Diminished: "diminished",
      Augmented: "augmented",
    },
    "First Inversion": {
      Major: "major_6",
      Minor: "minor_6",
      Diminished: "diminished_6",
    },
    "Second Inversion": {
      Major: "major_46",
      Minor: "minor_46",
      Diminished: "diminished_46",
    },
  },
  "Seventh Chords": {
    "Dominant Seventh": {
      "Dominant Seventh - Root Position": "D7",
      "Dominant Seventh - First Inversion": "D7_3",
      "Dominant Seventh - Second Inversion": "D7_5",
      "Dominant Seventh - Third Inversion": "D7_7",
    },
    Other: {
      "Minor Seventh": "min7",
      "Half Diminished Seventh": "m7b5",
      "Diminished Seventh": "dim7",
    },
  },
};

const SEQUENCE_GROUP_NAMES: {
  [sequence: string]: string[];
} = {
  Intervals: ["Simple Intervals"],
  Triads: ["Root Position", "First Inversion", "Second Inversion"],
  "Seventh Chords": ["Dominant Seventh", "Other"],
};

const INTERVALS_DEFAULT = {
  "Simple Intervals": [
    "Unison",
    "Minor Second",
    "Major Second",
    "Minor Third",
    "Major Third",
    "Perfect Fourth",
    "Tritone",
  ],
};

const TRIAD_DEFAULT = {
  "Root Position": ["Major", "Minor", "Diminished", "Augmented"],
};

const SEVENTH_CHORDS_DEFAULT = {
  "Dominant Seventh": [
    "Dominant Seventh - Root Position",
    "Dominant Seventh - First Inversion",
    "Dominant Seventh - Second Inversion",
    "Dominant Seventh - Third Inversion",
  ],
};

const PIANO_KEYS = [
  "A0",
  "A#0",
  "B0",
  ...Array.from({ length: 6 }, (_, i) => [
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
    `B${i + 1}`,
  ]).flat(),
  "C8",
] as const;

export {
  SEQUENCE_TYPES,
  SEQUENCE_GROUP_NAMES,
  INTERVALS_DEFAULT,
  TRIAD_DEFAULT,
  SEVENTH_CHORDS_DEFAULT,
  PIANO_KEYS,
};
