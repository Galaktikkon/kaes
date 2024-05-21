"use client";

import game from "@/src/State/Game";
import {
  Center,
  Divider,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { observer } from "mobx-react";

const CurrentStatsGroup = observer(() => {
  return (
    <StatGroup height={"100px"}>
      <Stat padding={5}>
        <StatLabel>Correct</StatLabel>
        <StatNumber>{game.currentStats.correct}</StatNumber>
        <StatHelpText>
          {game.currentStats.isLastWin &&
            game.currentStats.isLastWin !== undefined && (
              <StatArrow type={"increase"} />
            )}
        </StatHelpText>
      </Stat>
      <Divider orientation="vertical" />
      <Stat padding={5}>
        <StatLabel>Incorrect</StatLabel>
        <StatNumber>{game.currentStats.incorrect}</StatNumber>
        <StatHelpText>
          {!game.currentStats.isLastWin &&
            game.currentStats.isLastWin !== undefined && (
              <StatArrow type={"decrease"} />
            )}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
});

export default CurrentStatsGroup;
