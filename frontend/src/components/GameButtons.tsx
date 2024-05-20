"use client";

import { Button, Flex, HStack, Spacer, Grid, useToast } from "@chakra-ui/react";
import { observer } from "mobx-react";
import game from "../State/Game";
import ExerciseSettingsDrawer from "./settings/ExerciseSettingsDrawer";
import { Fragment } from "react";
import { fetchAnswear, getNewQuestion } from "../Services/game";
import { useConfigContext } from "@/app/configProvider";
import { group } from "console";
import { useSession } from "next-auth/react";

interface GameButtonsProps {
  exerciseName: string;
  availableSequenceTypes: { [groupName: string]: { [type: string]: string } };
  availableGroupTypes: string[];
}

const GameButtons = observer(
  ({
    exerciseName,
    availableSequenceTypes,
    availableGroupTypes,
  }: GameButtonsProps) => {
    const toast = useToast();

    const session = useSession();

    const configData = useConfigContext();

    const handleOnClick = (type: string, groupName: string) => {
      game.isActive
        ? fetchAnswear({
            pitch_sequence: game.currentQuestion,
            answear_to_check:
              configData["Exercise Types"][game.settings.exercise.name][
                groupName
              ][type],
            exercise_type: game.settings.exercise.name,
            group_type: groupName,
            note_duration: game.settings.playSettings.noteDuration,
            instrument: game.settings.playSettings.instrument,
            pitch_range: game.settings.playSettings.octaveRange,
            token: session.data?.user.access as string,
          })
            .then((response) => {
              response.result
                ? ((game.currentStats.correct += 1),
                  game.currentStats.setIsLastWin(true))
                : ((game.currentStats.incorrect += 1),
                  game.currentStats.setIsLastWin(false));
              setTimeout(getNewQuestion, 500);
            })
            .catch((error) => {
              console.error(error);
            })
        : toast({
            title: "Game has not been started",
            description: `Click the "START" button!`,
            status: "info",
            isClosable: true,
          });
    };

    return (
      <HStack>
        <Flex>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={2}
            maxH="70%"
          >
            {Object.entries(game.settings.exercise.sequenceTypes).map(
              ([groupName, types], index) => (
                <Fragment key={index}>
                  {types.map((type, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      colorScheme="gray"
                      p={2}
                      textAlign="center"
                      onClick={() => handleOnClick(type, groupName)}
                    >
                      {groupName === "Simple Intervals" ||
                      type === "Augmented" ||
                      groupName === "Dominant Seventh" ||
                      groupName === "Other"
                        ? type
                        : `${type} - ${groupName}`}
                    </Button>
                  ))}
                </Fragment>
              )
            )}
          </Grid>
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
