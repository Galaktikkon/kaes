import { loaded } from "tone";
import game from "../State/Game";
import sampler from "./sampler";

const playQuestion = (sequence: string[]) => {
  loaded().then(() => {
    sampler.triggerAttackRelease(
      sequence,
      game.settings.playSettings.noteDuration
    );
  });
};

export type sequenceRequest = {
  pitch_range_low: string;
  pitch_range_high: string;
  sequence_types: string[];
  group_type: string;
};

const fetchSequence = async ({
  pitch_range_low,
  pitch_range_high,
  sequence_types,
  group_type,
}: sequenceRequest): Promise<{ sequence: string[] }> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_HOST + "/api/" + group_type + "/",
    {
      method: "POST",
      body: JSON.stringify({
        pitch_range_low,
        pitch_range_high,
        sequence_types,
        group_type,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await response.json();

  if (response.ok && data) {
    return data;
  }

  throw Error(data.detail);
};

export type answearRequest = {
  pitch_sequence: string[];
  answear_to_check: string;
  exercise_type: string;
  group_type: string;
  note_duration: number;
  instrument: string;
  pitch_range: [string, string];
  token: string;
};

const fetchAnswear = async ({
  pitch_sequence,
  answear_to_check,
  exercise_type,
  group_type,
  note_duration,
  instrument,
  pitch_range,
  token,
}: answearRequest): Promise<{ result: string }> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_HOST + "/api/check_answear/",
    {
      method: "POST",
      body: JSON.stringify({
        pitch_sequence,
        answear_to_check,
        exercise_type: exercise_type.toLowerCase().replace(" ", "_"),
        group_type,
        note_duration,
        instrument,
        pitch_range,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await response.json();

  if (response.ok && data) {
    return data;
  }

  throw Error(data.detail);
};

const getNewQuestion = () => {
  fetchSequence(game.settings.getSettingsJSON())
    .then((response) => {
      game.setCurrentQuestion(response.sequence);
      playQuestion(game.currentQuestion);
      game.setIsActive(true);
    })
    .catch((error) => {
      console.error(error);
    });
};

export { playQuestion, getNewQuestion, fetchSequence, fetchAnswear };
