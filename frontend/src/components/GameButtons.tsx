"use client";

import { Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import GameSettings from "../state/Game";
import ExerciseSettingsDrawer from "./settings/ExerciseSettingsDrawer";

interface GameButtonsProps {
  exerciseName: string;
  availableSequenceTypes: string[];
  availableGroupTypes: string[];
}

const GameButtons = observer(
  ({
    exerciseName,
    availableSequenceTypes,
    availableGroupTypes,
  }: GameButtonsProps) => {
    return (
      <HStack>
        <Flex>
          <Stack spacing={2}>
            {Object.entries(GameSettings.exercise.sequenceTypes).map(
              ([subType, types], index) => {
                return (
                  <Stack key={index} spacing={2}>
                    {types.map((type: string, idx: number) => (
                      <Button
                        key={idx}
                        variant={"outline"}
                        colorScheme={"gray"}
                      >
                        {GameSettings.exercise.name === "Intervals" ||
                        type === "Augmented"
                          ? type
                          : type + " - " + subType}
                      </Button>
                    ))}
                  </Stack>
                );
              }
            )}
          </Stack>
          <Spacer />
          <Flex>
            <ExerciseSettingsDrawer
              exerciseName={exerciseName}
              availableSequenceTypes={availableSequenceTypes}
              availableGroupTypes={availableGroupTypes}
            />
          </Flex>
        </Flex>
      </HStack>
    );
  }
);

export default GameButtons;
