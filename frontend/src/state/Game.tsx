"use client";

import { makeAutoObservable, runInAction } from "mobx";

type GameSettings = {
  exercise: {
    name: string;
    sequenceTypes: { [groupName: string]: string[] };
  };
  playSettings: {
    noteDuration: number;
    playType: string;
    instrument: string;
    octaveRange: [string, string];
  };
  setExerciseName: (newExerciseName: string) => void;
  setSequenceTypes: (groupName: string, newTypes: string[]) => void;
  setGroupNames: (groupNames: string[]) => void;
  setPlaySettings: (
    ...args: Partial<{
      noteDuration: number;
      playType: string;
      instrument: string;
      octaveRange: [string, string];
    }>[]
  ) => void;
};

class Game {
  private static instance: Game;

  settings: GameSettings = {
    exercise: {
      name: "",
      sequenceTypes: {},
    },
    playSettings: {
      noteDuration: 1,
      playType: "melodic-up",
      instrument: "piano",
      octaveRange: ["C3", "C5"],
    },

    setExerciseName: (newExerciseName: string) => {
      this.settings.exercise.name = newExerciseName;
    },

    setSequenceTypes: (groupName: string, newTypes: string[]) => {
      runInAction(() => {
        this.settings.exercise.sequenceTypes = {
          ...this.settings.exercise.sequenceTypes,
          [groupName]: newTypes,
        };
      });
    },

    setPlaySettings: (
      ...args: Partial<{
        noteDuration: number;
        playType: string;
        instrument: string;
        octaveRange: [string, string];
      }>[]
    ) => {
      for (const arg of args) {
        Object.assign(this.settings, arg);
      }
    },

    setGroupNames: (groupNames: string[]) => {
      runInAction(() => {
        this.settings.exercise.sequenceTypes = {};
        for (const name of groupNames) {
          this.settings.exercise.sequenceTypes = {
            ...this.settings.exercise.sequenceTypes,
            [name]: [],
          };
        }
      });
    },
  };

  currentStats: {
    correct: number;
    incorrect: number;
  } = {
    correct: 0,
    incorrect: 0,
  };

  private constructor() {
    makeAutoObservable(this);
  }

  static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}

const game: Game = Game.getInstance();

export default game;
