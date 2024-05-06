"use client";

import {
  fetchSequence,
  getNewQuestion,
  playQuestion,
} from "@/src/services/game";
import game from "@/src/state/Game";
import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react";

const StartButton = observer(() => {
  return (
    <>
      <Button
        onClick={() => {
          game.isActive ? game.setIsActive(false) : getNewQuestion();
        }}
      >
        {game.isActive ? "STOP" : "START"}
      </Button>
    </>
  );
});

export default StartButton;
