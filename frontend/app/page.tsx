"use client";

import { Button, Container, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import Header from "@/src/components/Header";
import game from "@/src/state/Game";
import GameButtons from "@/src/components/GameButtons";
import {
  SEVEN_CHORDS_DEFAULT,
  SEVEN_CHORDS_GROUP_NAMES,
  SEVEN_CHORDS_TYPES,
  INTERVALS_DEFAULT,
  INTERVAL_GROUP_NAMES,
  INTERVAL_TYPES,
  TRIAD_DEFAULT,
  TRIAD_GROUP_NAMES,
  TRIAD_TYPES,
} from "./config";

const Home = observer(() => {
  const [isMenu, setIsMenu] = useState(true);
  const [isIntervals, setIsIntervals] = useState(false);
  const [isTriads, setIsTriads] = useState(false);
  const [isSevenChords, setIsSevenChords] = useState(false);

  return (
    <>
      <Header />
      <Container
        size={"md"}
        h={"100vh"}
        centerContent
        justifyContent={"center"}
      >
        {isIntervals && (
          <GameButtons
            exerciseName="Intervals"
            availableSequenceTypes={Object.keys(INTERVAL_TYPES)}
            availableGroupTypes={INTERVAL_GROUP_NAMES}
          />
        )}
        {isTriads && (
          <GameButtons
            exerciseName="Triads"
            availableSequenceTypes={Object.keys(TRIAD_TYPES)}
            availableGroupTypes={Object.keys(TRIAD_GROUP_NAMES)}
          />
        )}
        {isSevenChords && (
          <GameButtons
            exerciseName="SEVEN Chords"
            availableSequenceTypes={Object.keys(SEVEN_CHORDS_TYPES)}
            availableGroupTypes={Object.keys(SEVEN_CHORDS_GROUP_NAMES)}
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
                      game.settings.setGroupNames(INTERVAL_GROUP_NAMES);
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
                        Object.keys(TRIAD_GROUP_NAMES)
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
                        Object.keys(SEVEN_CHORDS_GROUP_NAMES)
                      );
                      game.settings.setExerciseName("Seven Chords");
                      game.settings.setSequenceTypes(
                        "Root Position",
                        SEVEN_CHORDS_DEFAULT["Root Position"]
                      );
                      setIsSevenChords(true);
                      setIsMenu(false);
                    });
                  }}
                >
                  Seven Chords
                </Button>
              </GridItem>
            </>
          )}
        </Grid>
        {(isIntervals || isTriads || isSevenChords) && (
          <HStack
            padding={10}
            justifyContent={"center"}
            alignContent={"center"}
            marginTop={"20%"}
          >
            <Button
              onClick={() => {
                setIsMenu(true);
                setIsIntervals(false);
                setIsTriads(false);
                setIsSevenChords(false);
              }}
            >
              EXIT
            </Button>
            <Button>SKIP</Button>
            <Button>AGAIN</Button>
          </HStack>
        )}
      </Container>
    </>
  );
});

export default Home;
