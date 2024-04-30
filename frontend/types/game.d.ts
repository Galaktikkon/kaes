type Game = {
  exercise: {
    sequenceName: string;
    sequenceTypes: { [subType: string]: string[] };
  };
  settings: {
    noteDuration: number;
    playType: string;
    instrument: string;
  };
  currentStats: {
    correct: number;
    incorrect: number;
  };
};

type GameSettings = {
  game: Game;
  setExerciseName: Function;
  setSequenceTypes: Function;
  setSettings: Function;
  setCurrentStats: Function;
};
