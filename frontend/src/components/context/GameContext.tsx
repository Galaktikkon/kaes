"use client";

import { makeAutoObservable, runInAction } from "mobx";

class Game {
  private static instance: Game;

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
    octaveRange: [string, string];
  } = {
    noteDuration: 1,
    playType: "melodic-up",
    instrument: "piano",
    octaveRange: ["C3", "C5"],
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

  setExerciseName(exerciseName: string) {
    this.exercise.sequenceName = exerciseName;
  }

  setSequenceTypes(groupName: string, newTypes: string[]) {
    runInAction(() => {
      this.exercise.sequenceTypes = {
        ...this.exercise.sequenceTypes,
        [groupName]: newTypes,
      };
    });
  }

  setGroupNames(groupNames: string[]) {
    runInAction(() => {
      this.exercise.sequenceTypes = {};
      for (const name of groupNames) {
        this.exercise.sequenceTypes = {
          ...this.exercise.sequenceTypes,
          [name]: [],
        };
      }
    });
  }

  setGameSettings(
    ...args: Partial<{
      noteDuration: number;
      playType: string;
      instrument: string;
      octaveRange: [string, string];
    }>[]
  ) {
    for (const arg of args) {
      Object.assign(this.settings, arg);
    }
  }
}

const GameSettings: Game = Game.getInstance();

export default GameSettings;
