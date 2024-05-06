"use client";

import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import Header from "@/src/components/Header";
import game from "@/src/state/Game";
import GameButtons from "@/src/components/GameButtons";
import {
  SEVENTH_CHORDS_DEFAULT,
  INTERVALS_DEFAULT,
  TRIAD_DEFAULT,
  SEQUENCE_TYPES,
  SEQUENCE_GROUP_NAMES,
} from "./config";
import GameInterface from "@/src/components/GameInterface/GameInterface";

const Home = observer(() => {
  const [isMenu, setIsMenu] = useState(true);
  const [isIntervals, setIsIntervals] = useState(false);
  const [isTriads, setIsTriads] = useState(false);
  const [isSeventhChords, setIsSeventhChords] = useState(false);

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      <Container
        maxW="100%"
        centerContent
        justifyContent={"center"}
        alignItems={"center"}
        alignSelf={"stretch"}
        display={"flex"}
        flex={1}
      >
        {isIntervals && (
          <GameButtons
            exerciseName="Intervals"
            availableSequenceTypes={SEQUENCE_TYPES["Intervals"]}
            availableGroupTypes={SEQUENCE_GROUP_NAMES["Intervals"]}
          />
        )}
        {isTriads && (
          <GameButtons
            exerciseName="Triads"
            availableSequenceTypes={SEQUENCE_TYPES["Triads"]}
            availableGroupTypes={SEQUENCE_GROUP_NAMES["Triads"]}
          />
        )}
        {isSeventhChords && (
          <GameButtons
            exerciseName="Seventh Chords"
            availableSequenceTypes={SEQUENCE_TYPES["Seventh Chords"]}
            availableGroupTypes={SEQUENCE_GROUP_NAMES["Seventh Chords"]}
          />
        )}
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {isMenu && (
            <>
              <GridItem
                gridColumn={1}
                gridRow={1}
                placeItems={"center"}
                alignSelf={"center"}
                justifySelf={"center"}
              >
                <Button
                  bgColor={"blueviolet"}
                  onClick={() => {
                    runInAction(() => {
                      game.settings.setGroupNames(
                        SEQUENCE_GROUP_NAMES["Intervals"]
                      );
                      game.settings.setExerciseName("Intervals");
                      game.settings.setSequenceTypes(
                        "Simple Intervals",
                        INTERVALS_DEFAULT["Simple Intervals"]
                      );
                      setIsIntervals(true);
                      setIsMenu(false);
                    });
                  }}
                >
                  Intervals
                </Button>
              </GridItem>

              <GridItem
                gridColumn={2}
                gridRow={2}
                placeItems={"center"}
                alignSelf="center"
                justifySelf="center"
              >
                <Button
                  bgColor={"green"}
                  onClick={() => {
                    runInAction(() => {
                      game.settings.setGroupNames(
                        SEQUENCE_GROUP_NAMES["Triads"]
                      );
                      game.settings.setExerciseName("Triads");
                      game.settings.setSequenceTypes(
                        "Root Position",
                        TRIAD_DEFAULT["Root Position"]
                      );
                      setIsTriads(true);
                      setIsMenu(false);
                    });
                  }}
                >
                  Triads
                </Button>
              </GridItem>

              <GridItem
                gridColumn={3}
                gridRow={3}
                placeItems={"center"}
                alignSelf="center"
                justifySelf="center"
              >
                <Button
                  bgColor={"red"}
                  whiteSpace={"nowrap"}
                  onClick={() => {
                    runInAction(() => {
                      game.settings.setGroupNames(
                        SEQUENCE_GROUP_NAMES["Seventh Chords"]
                      );
                      game.settings.setExerciseName("Seventh Chords");
                      game.settings.setSequenceTypes(
                        "Dominant Seventh",
                        SEVENTH_CHORDS_DEFAULT["Dominant Seventh"]
                      );
                      setIsSeventhChords(true);
                      setIsMenu(false);
                    });
                  }}
                >
                  Seventh Chords
                </Button>
              </GridItem>
            </>
          )}
        </Grid>
        {(isIntervals || isTriads || isSeventhChords) && (
          <GameInterface
            exitFunction={() => {
              setIsMenu(true);
              setIsIntervals(false);
              setIsTriads(false);
              setIsSeventhChords(false);
              game.setIsActive(false);
              game.currentStats.clear();
            }}
          ></GameInterface>
        )}
      </Container>
    </Flex>
  );
});

export default Home;
