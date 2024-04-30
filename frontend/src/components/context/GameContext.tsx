"use client";

import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class Game {
  exercise: {
    sequenceName: string;
    sequenceTypes: { [subType: string]: string[] };
  } = {
    sequenceName: "",
    sequenceTypes: {},
  };
  settings: {
    noteDuration: number;
    playType: string;
    instrument: string;
  } = {
    noteDuration: 1,
    playType: "melodic-up",
    instrument: "piano",
  };
  currentStats: {
    correct: number;
    incorrect: number;
  } = {
    correct: 0,
    incorrect: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setExercise(exerciseName: string, groupName: string, newTypes: string[]) {
    this.exercise.sequenceName = exerciseName;
    this.exercise.sequenceTypes = {
      ...this.exercise.sequenceTypes,
      [groupName]: newTypes,
    };
  }
  setGameSettings(
    ...args: Partial<{
      noteDuration: number;
      playType: string;
      instrument: string;
    }>[]
  ) {
    for (const arg of args) {
      Object.assign(this.settings, arg);
    }
  }
}

const GameSettingsContext = createContext(new Game());

export function GameSettingsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameSettingsContext.Provider value={new Game()}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettingsContext() {
  return useContext(GameSettingsContext);
}
