"use client";

import { Button, Container, Grid, GridItem, HStack } from "@chakra-ui/react";
import Header from "@/src/components/Header";
import { useState } from "react";
import IntervalsButtons from "@/src/components/IntervalsButtons";
import TriadsButtons from "@/src/components/TriadsButtons";
import SevenChordsButtons from "@/src/components/ExtendedChordsButtons";
import { GameSettingsWrapper } from "@/src/components/context/GameContext";

export default function Home() {
  const [isMenu, setIsMenu] = useState(true);
  const [isIntervals, setIsIntervals] = useState(false);
  const [isTriads, setIsTriads] = useState(false);
  const [isSevenChords, setIsSevenChords] = useState(false);

  return (
    <GameSettingsWrapper>
      {
        <>
          <Header />
          <Container
            size={"md"}
            h={"100vh"}
            centerContent
            justifyContent={"center"}
          >
            {isIntervals && <IntervalsButtons />}
            {isTriads && <TriadsButtons />}
            {isSevenChords && <SevenChordsButtons />}
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
                        setIsIntervals(true);
                        setIsMenu(false);
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
                        setIsTriads(true);
                        setIsMenu(false);
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
                      wordBreak={"break-word"}
                      onClick={() => {
                        setIsSevenChords(true);
                        setIsMenu(false);
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
      }
    </GameSettingsWrapper>
  );
}
