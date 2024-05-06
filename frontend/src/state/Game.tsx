"use client";

import { SEQUENCE_TYPES } from "@/app/config";
import { makeAutoObservable, runInAction } from "mobx";
import { sequenceRequest } from "../services/game";

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
  getSelectedSymbols: () => string[];
  getSettingsJSON: () => sequenceRequest;
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

    getSelectedSymbols: () => {
      const selectedSymbols: string[] = [];
      for (const groupName of Object.keys(
        this.settings.exercise.sequenceTypes
      )) {
        for (const type of this.settings.exercise.sequenceTypes[groupName]) {
          selectedSymbols.push(
            SEQUENCE_TYPES[this.settings.exercise.name][groupName][type]
          );
        }
      }
      return selectedSymbols;
    },

    getSettingsJSON: () => {
      return {
        pitch_range_low: this.settings.playSettings.octaveRange[0],
        pitch_range_high: this.settings.playSettings.octaveRange[1],
        sequence_types: this.settings.getSelectedSymbols(),
        type: this.settings.exercise.name.toLowerCase().replace(" ", "_"),
      };
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
        Object.assign(this.settings.playSettings, arg);
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
    isLastWin: boolean | undefined;
    setIsLastWin: (value: boolean | undefined) => void;
    correct: number;
    incorrect: number;
    clear: () => void;
  } = {
    isLastWin: undefined,
    correct: 0,
    incorrect: 0,
    setIsLastWin(value) {
      this.isLastWin = value;
    },
    clear() {
      this.setIsLastWin(undefined);
      this.correct = 0;
      this.incorrect = 0;
    },
  };

  currentQuestion: string[] = [];

  setCurrentQuestion(newQuestion: string[]) {
    this.currentQuestion = newQuestion;
  }

  isActive: boolean = false;

  setIsActive(value: boolean) {
    this.isActive = value;
  }

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
