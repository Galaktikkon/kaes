interface ExerciseTypes {
  [exerciseName: string]: {
    [groupName: string]: {
      [sequenceName: string]: string;
    };
  };
}

interface DefaultSettings {
  [exerciseName: string]: {
    [groupName: string]: string[];
  };
}

interface ExerciseGroupNames {
  [groupName: string]: string[];
}

interface InstrumentTypes {
  [key: string]: [string, string];
}

interface InstrumentRanges {
  [key: string]: string[];
}

interface Instruments {
  Types: InstrumentTypes;
  Ranges: InstrumentRanges;
}

interface ConfigData {
  "Exercise Types": ExerciseTypes;
  "Exercise group names": ExerciseGroupNames;
  "Default Settings": DefaultSettings;
  Instruments: Instruments;
}
