"use client";

import { getNewQuestion } from "@/src/Services/game";
import game from "@/src/State/Game";
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
