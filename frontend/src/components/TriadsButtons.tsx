import { Button, Stack } from "@chakra-ui/react";
import { useState } from "react";

const TriadsButtons: React.FC = () => {
  // List of triad types
  const triadTypes: string[] = ["Major", "Minor", "Augmented", "Diminished"];

  // List of inversions
  const inversions: string[] = [
    "Root Position",
    "First Inversion",
    "Second Inversion",
  ];

  return (
    <Stack spacing={2}>
      {triadTypes.map((triadType: string, index: number) => (
        <Stack key={index} spacing={2}>
          {triadType === "Augmented" ? (
            <Button variant="outline" colorScheme="gray">
              {triadType}
            </Button>
          ) : (
            inversions.map((inversion: string, idx: number) => (
              <Button key={idx} variant={"outline"} colorScheme={"gray"}>
                {triadType} - {inversion}
              </Button>
            ))
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default TriadsButtons;
