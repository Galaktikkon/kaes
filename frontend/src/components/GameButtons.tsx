"use client";

import { Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import { useGameSettingsContext } from "./context/GameContext";
import SequenceTypesSettings from "./settings/SequenceSettings";
import { observer } from "mobx-react";

interface GameButtonsProps {
  sequenceName: string;
  sequenceTypes: string[];
  groupTypes: string[];
}

const GameButtons = observer(
  ({ sequenceName, sequenceTypes, groupTypes }: GameButtonsProps) => {
    const game = useGameSettingsContext();

    return (
      <HStack>
        <Flex>
          <Stack spacing={2}>
            {Object.entries(game.exercise.sequenceTypes).map(
              ([subType, types], index) => {
                console.log("🚀 ~ types:", types);
                console.log("🚀 ~ subType:", subType);

                return (
                  <Stack key={index} spacing={2}>
                    {types.map((type: string, idx: number) => (
                      <Button
                        key={idx}
                        variant={"outline"}
                        colorScheme={"gray"}
                      >
                        {type}
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
