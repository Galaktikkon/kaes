import { Button, Grid, GridItem, Stack } from "@chakra-ui/react";
import React from "react";

const SevenChordsButtons: React.FC = () => {
  // List of seven chord types
  const sevenChordTypes: string[] = [
    "Dominant Seventh",
    "Minor Dominant Seventh",
    "Half Diminished Seventh",
    "Diminished Seventh",
  ];

  // List of inversions
  const inversions: string[] = [
    "Root Position",
    "First Inversion",
    "Second Inversion",
    "Third Inversion",
  ];

  return (
    <Grid templateColumns="1fr 1fr" gap={4}>
      <GridItem colSpan={1}>
        <Stack spacing={2}>
          {sevenChordTypes
            .slice(0, Math.ceil(sevenChordTypes.length / 2))
            .map((chordType: string, index: number) => (
              <Stack key={index} spacing={2}>
                <Button variant="outline" colorScheme="purple">
                  {chordType}
                </Button>
                {inversions.map((inversion: string, idx: number) => (
                  <Button key={idx} variant="outline" colorScheme="purple">
                    {chordType} - {inversion}
                  </Button>
                ))}
              </Stack>
            ))}
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        <Stack spacing={2}>
          {sevenChordTypes
            .slice(Math.ceil(sevenChordTypes.length / 2))
            .map((chordType: string, index: number) => (
              <Stack key={index} spacing={2}>
                <Button variant="outline" colorScheme="purple">
                  {chordType}
                </Button>
                {inversions.map((inversion: string, idx: number) => (
                  <Button key={idx} variant="outline" colorScheme="purple">
                    {chordType} - {inversion}
                  </Button>
                ))}
              </Stack>
            ))}
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default SevenChordsButtons;
