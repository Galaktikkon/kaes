"use client";

import { Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import IntervalsSettings from "./settings/IntervalsSettings";
import { useGameSettingsContext } from "./context/GameContext";
import { useEffect, useState } from "react";

const defaultIntervals = {
  "Simple Intervals": [
    "Unison",
    "Minor Second",
    "Major Second",
    "Minor Third",
    "Major Third",
    "Perfect Fourth",
    "Tritone",
  ],
};

const IntervalsButtons = () => {
  const { game } = useGameSettingsContext();

  return (
    <HStack>
      <Flex>
        <Stack spacing={2}>
          {Object.entries(game.exercise.sequenceTypes).map(
            ([subType, types], index) => (
              <Stack key={index} spacing={2}>
                {types.map((type: string, idx: number) => (
                  <Button key={idx} variant={"outline"} colorScheme={"gray"}>
                    {type}
                  </Button>
                ))}
              </Stack>
            )
          )}
        </Stack>
        <Spacer />
        <Flex>
          <IntervalsSettings />
        </Flex>
      </Flex>
    </HStack>
  );
};

export default IntervalsButtons;
