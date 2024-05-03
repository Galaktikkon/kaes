"use client";

import { Button, Container, Grid, GridItem, HStack } from "@chakra-ui/react";
import Header from "@/src/components/Header";
import { useState } from "react";
import GameSettings from "@/src/components/context/GameContext";
import GameButtons from "@/src/components/GameButtons";
import {
  EXTENDED_CHORDS_DEFAULT,
  EXTENDED_CHORDS_GROUP_NAMES,
  EXTENDED_CHORDS_TYPES,
  INTERVALS_DEFAULT,
  INTERVAL_GROUP_NAMES,
  INTERVAL_TYPES,
  TRIAD_DEFAULT,
  TRIAD_GROUP_NAMES,
  TRIAD_TYPES,
} from "./config";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

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
            sequenceName="Intervals"
            sequenceTypes={INTERVAL_TYPES}
            groupTypes={INTERVAL_GROUP_NAMES}
          />
        )}
        {isTriads && (
          <GameButtons
            sequenceName="Triads"
            sequenceTypes={TRIAD_TYPES}
            groupTypes={TRIAD_GROUP_NAMES}
          />
        )}
        {isSevenChords && (
          <GameButtons
            sequenceName="Extended Chords"
            sequenceTypes={EXTENDED_CHORDS_TYPES}
            groupTypes={EXTENDED_CHORDS_GROUP_NAMES}
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
                      GameSettings.setGroupNames(INTERVAL_GROUP_NAMES);
                      GameSettings.setExerciseName(
                        INTERVALS_DEFAULT.sequenceName
                      );
                      GameSettings.setSequenceTypes(
                        "Simple Intervals",
                        INTERVALS_DEFAULT.sequenceTypes["Simple Intervals"]
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
                      GameSettings.setGroupNames(TRIAD_GROUP_NAMES);
                      GameSettings.setExerciseName(TRIAD_DEFAULT.sequenceName);
                      GameSettings.setSequenceTypes(
                        "Root Position",
                        TRIAD_DEFAULT.sequenceTypes["Root Position"]
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
                      GameSettings.setGroupNames(EXTENDED_CHORDS_GROUP_NAMES);
                      GameSettings.setExerciseName(
                        EXTENDED_CHORDS_DEFAULT.sequenceName
                      );
                      GameSettings.setSequenceTypes(
                        "Root Position",
                        EXTENDED_CHORDS_DEFAULT.sequenceTypes["Root Position"]
                      );
                      setIsSevenChords(true);
                      setIsMenu(false);
                    });
                  }}
                >
                  Extended Chords
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
