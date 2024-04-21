import { Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import TriadsSettings from "./settings/TriadsSettings";
import { createContext, useState } from "react";

const ButtonContext = createContext({});

const TriadsButtons = () => {
  const [triadTypes, setTriadTypes] = useState({
    "Root Position": ["Major", "Minor", "Augmented", "Diminished"],
  });

  const setSelectedTypes = (groupName: string, types: string[]) => {
    setTriadTypes((prevSelectedTypes) => ({
      ...prevSelectedTypes,
      [groupName]: types,
    }));
  };

  return (
    <ButtonContext.Provider value={{ triadTypes, setSelectedTypes }}>
      <HStack>
        <Flex>
          <Stack spacing={2}>
            {Object.keys(triadTypes).map((triadType, index) => (
              <Stack key={index} spacing={2}>
                {triadTypes[triadType as keyof typeof triadTypes].map(
                  (type, idx) => (
                    <Button key={idx} variant={"outline"} colorScheme={"gray"}>
                      {triadType === "Root Position"
                        ? type
                        : `${type} - ${triadType}`}
                    </Button>
                  )
                )}
              </Stack>
            ))}
          </Stack>
          <Spacer />
          <Flex>
            <TriadsSettings setSelectedTypes={setSelectedTypes} />
          </Flex>
        </Flex>
      </HStack>
    </ButtonContext.Provider>
  );
};

export default TriadsButtons;
