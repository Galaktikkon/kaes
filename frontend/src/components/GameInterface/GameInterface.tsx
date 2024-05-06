"use client";

import { Button, HStack, VStack } from "@chakra-ui/react";
import StartButton from "./StartButton";
import AgainButton from "./AgainButton";
import CurrentStatsGroup from "./CurrentStatsGroup";

interface GameInterfaceProps {
  exitFunction: Function;
}

const GameInterface = ({ exitFunction }: GameInterfaceProps) => {
  return (
    <VStack
      position="fixed"
      bottom="25"
      justifyContent={"center"}
      alignContent={"center"}
    >
      <HStack>
        <Button onClick={() => exitFunction()}>EXIT</Button>
        <StartButton />
        <AgainButton />
      </HStack>
      <CurrentStatsGroup />
    </VStack>
  );
};

export default GameInterface;
