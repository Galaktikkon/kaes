"use client";

import { Button, Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import Header from "@/src/components/Header";
import game from "@/src/State/Game";
import GameButtons from "@/src/components/GameButtons";
import GameInterface from "@/src/components/GameInterface/GameInterface";
import { useConfigContext } from "@/app/configProvider";

const Home = observer(() => {
  const [isMenu, setIsMenu] = useState(true);
  const [isIntervals, setIsIntervals] = useState(false);
  const [isTriads, setIsTriads] = useState(false);
  const [isSeventhChords, setIsSeventhChords] = useState(false);
  const config = useConfigContext();
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
            availableSequenceTypes={config["Exercise Types"]["Intervals"]}
            availableGroupTypes={config["Exercise group names"]["Intervals"]}
          />
        )}
        {isTriads && (
          <GameButtons
            exerciseName="Triads"
            availableSequenceTypes={config["Exercise Types"]["Triads"]}
            availableGroupTypes={config["Exercise group names"]["Triads"]}
          />
        )}
        {isSeventhChords && (
          <GameButtons
            exerciseName="Seventh Chords"
            availableSequenceTypes={config["Exercise Types"]["Seventh Chords"]}
            availableGroupTypes={
              config["Exercise group names"]["Seventh Chords"]
            }
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
                        config["Exercise group names"]["Intervals"]
                      );
                      game.settings.setExerciseName("Intervals");
                      game.settings.setSequenceTypes(
                        "Simple Intervals",
                        config["Default Settings"]["Intervals default"][
                          "Simple Intervals"
                        ]
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
                        config["Exercise group names"]["Triads"]
                      );
                      game.settings.setExerciseName("Triads");
                      game.settings.setSequenceTypes(
                        "Root Position",
                        config["Default Settings"]["Triads default"][
                          "Root Position"
                        ]
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
                        config["Exercise group names"]["Seventh Chords"]
                      );
                      game.settings.setExerciseName("Seventh Chords");
                      game.settings.setSequenceTypes(
                        "Dominant Seventh",
                        config["Default Settings"]["Seventh chords default"][
                          "Dominant Seventh"
                        ]
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
