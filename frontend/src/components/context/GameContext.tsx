"use client";

import { createContext, useContext, useState } from "react";

const game: Game = {
  exercise: {
    sequenceName: "",
    sequenceTypes: {},
  },
  settings: {
    noteDuration: 1,
    playType: "melodic-up",
    instrument: "piano",
  },
  currentStats: {
    correct: 0,
    incorrect: 0,
  },
};

const GameSettingsContext = createContext<GameSettings>({
  game: game,
  setExerciseName: () => {},
  setSequenceTypes: () => {},
  setSettings: () => {},
  setCurrentStats: () => {},
});

export function GameSettingsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [exerciseName, setExerciseName] = useState(game.exercise.sequenceName);
  const [sequenceTypes, setSequenceTypes] = useState(
    game.exercise.sequenceTypes
  );
  const [settings, setSettings] = useState(game.settings);
  const [currentStats, setCurrentStats] = useState(game.currentStats);

  const setGameSequenceTypes = (groupName: string, newTypes: string[]) => {
    setSequenceTypes((prevSequenceTypes) => ({
      ...prevSequenceTypes,
      [groupName]: newTypes,
    }));
    game.exercise.sequenceTypes = sequenceTypes;
  };

  const setGameSettings = (
    ...args: Partial<{
      noteDuration: number;
      playType: string;
      instrument: string;
    }>[]
  ) => {
    setSettings((settings) => {
      for (const arg of args) {
        Object.assign(settings, arg);
      }
      return settings;
    });
  };

  return (
    <GameSettingsContext.Provider
      value={{
        game: game,
        setExerciseName: setExerciseName,
        setSequenceTypes: setGameSequenceTypes,
        setSettings: setGameSettings,
        setCurrentStats: setCurrentStats,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettingsContext() {
  return useContext(GameSettingsContext);
}
