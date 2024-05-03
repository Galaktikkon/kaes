const INTERVAL_TYPES: { [type: string]: string } = {
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
};

const INTERVAL_GROUP_NAMES: string[] = ["Simple Intervals"] as const;
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

const TRIAD_TYPES: { [type: string]: string } = {
  Major: "major",
  Minor: "minor",
  Diminished: "diminished",
  Augmented: "augmented",
} as const;
const TRIAD_GROUP_NAMES: { [type: string]: string } = {
  "Root Position": "",
  "First Inversion": "_6",
  "Second Inversion": "_46",
} as const;
const TRIAD_DEFAULT = {
  "Root Position": ["Major", "Minor", "Diminished", "Augmented"],
};

const SEVEN_CHORDS_TYPES: { [type: string]: string } = {
  "Dominant Seven": "D7",
  "Minor Dominant Seven": "d7",
  "Half Diminished Seventh": "hd7",
  "Fully Diminished Seventh": "fd7",
} as const;
const SEVEN_CHORDS_GROUP_NAMES: { [type: string]: string } = {
  "Root Position": "",
  "First Inversion": "_3",
  "Second Inversion": "_5",
  "Third Inversion": "_7",
} as const;
const SEVEN_CHORDS_DEFAULT = {
  "Root Position": [
    "Dominant Seven",
    "Minor Dominant Seven",
    "Half Diminished Seventh",
    "Fully Diminished Seventh",
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
