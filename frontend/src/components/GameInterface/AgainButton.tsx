"use client";

import { playQuestion } from "@/src/services/game";
import game from "@/src/state/Game";
import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react";

const AgainButton = observer(() => {
  return (
    <>
      <Button
        isDisabled={!game.isActive}
        onClick={() => playQuestion(game.currentQuestion)}
      >
        AGAIN
      </Button>
    </>
  );
});

export default AgainButton;
