import { Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import IntervalsSettings from "./settings/IntervalsSettings";
import { createContext, useState } from "react";

const ButtonContext = createContext({});

const IntervalsButtons = () => {
  const [intervalTypes, setIntervalTypes] = useState({
    "Simple Intervals": [
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
    ],
  });

  const setSelectedTypes = (groupName: string, types: string[]) => {
    setIntervalTypes((prevSelectedTypes) => ({
      ...prevSelectedTypes,
      [groupName]: types,
    }));
  };

  return (
    <ButtonContext.Provider value={{ intervalTypes, setSelectedTypes }}>
      <HStack>
        <Flex>
          <Stack spacing={2}>
            {Object.keys(intervalTypes).map((triadType, index) => (
              <Stack key={index} spacing={2}>
                {intervalTypes[triadType as keyof typeof intervalTypes].map(
                  (type, idx) => (
                    <Button key={idx} variant={"outline"} colorScheme={"gray"}>
                      {type}
                    </Button>
                  )
                )}
              </Stack>
            ))}
          </Stack>
          <Spacer />
          <Flex>
            <IntervalsSettings setSelectedTypes={setSelectedTypes} />
          </Flex>
        </Flex>
      </HStack>
    </ButtonContext.Provider>
  );
};

export default IntervalsButtons;
