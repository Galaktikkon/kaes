import { Button, Flex } from "@chakra-ui/react";

const IntervalsButtons = () => {
  // List of musical intervals
  const intervals = [
    "Unison",
    "Minor Second",
    "Major Second",
    "Minor Third",
    "Major Third",
    "Perfect Fourth",
    "Tritone",
    "Perfect Fifth",
    "Minor Sixth",
    "Major Sixth",
    "Minor Seventh",
    "Major Seventh",
    "Octave",
  ];

  return (
    <Flex direction="column" alignItems="center">
      {intervals.map((interval, index) => (
        <Button key={index} variant="outline" colorScheme="teal" my={2}>
          {interval}
        </Button>
      ))}
    </Flex>
  );
};

export default IntervalsButtons;
