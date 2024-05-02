"use client";

import { Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import GameSettings from "./context/GameContext";
import SequenceTypesSettings from "./settings/SequenceTypesSettings";
import { observer } from "mobx-react";

interface GameButtonsProps {
  sequenceName: string;
  sequenceTypes: string[];
  groupTypes: string[];
}

const GameButtons = observer(
  ({ sequenceName, sequenceTypes, groupTypes }: GameButtonsProps) => {
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
                        {GameSettings.exercise.sequenceName === "Intervals" ||
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
            <SequenceTypesSettings
              sequenceName={sequenceName}
              sequenceTypes={sequenceTypes}
              groupTypes={groupTypes}
            />
          </Flex>
        </Flex>
      </HStack>
    );
  }
);

export default GameButtons;
