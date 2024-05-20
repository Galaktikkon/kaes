import { Sampler } from "tone";
import game from "../State/Game";

const sampler: Sampler = new Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: game.settings.playSettings.noteDuration,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

export default sampler;
