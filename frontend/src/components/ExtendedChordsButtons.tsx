import { Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import ExtendedChordsSettings from "./settings/ExtendedChordsSettings";

const ButtonContext = createContext({});

const ExtendedChordsButtons = () => {
  const [triadTypes, setTriadTypes] = useState({
    "Root Position": [
      "Dominant Seven",
      "Minor Dominant Seven",
      "Half Diminished Seventh",
      "Fully Diminished Seventh",
    ],
  });

  const setSelectedTypes = (groupName: string, types: string[]) => {
    setTriadTypes((prevSelectedTypes) => ({
      ...prevSelectedTypes,
      [groupName]: types,
    }));
  };

  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const buttonHeight =
        document.getElementById("buttons")?.offsetHeight || 0;
      setIsOverflow(buttonHeight > height / 2);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [triadTypes]);

  const renderButtons = (triadType: string, types: string[]) => {
    return (
      <Stack key={triadType} spacing={2}>
        {types.map((type, idx) => (
          <Button key={idx} variant={"outline"} colorScheme={"gray"}>
            {triadType === "Root Position" ? type : `${type} - ${triadType}`}
          </Button>
        ))}
      </Stack>
    );
  };

  return (
    <ButtonContext.Provider value={{ triadTypes, setSelectedTypes }}>
      <Flex id="buttons">
        {isOverflow ? (
          <>
            <Stack spacing={2}>
              {Object.entries(triadTypes).map(
                ([triadType, types], index) =>
                  index % 2 === 0 && renderButtons(triadType, types)
              )}
            </Stack>
            <Spacer />
            <Stack spacing={2}>
              {Object.entries(triadTypes).map(
                ([triadType, types], index) =>
                  index % 2 === 1 && renderButtons(triadType, types)
              )}
            </Stack>
          </>
        ) : (
          <Stack spacing={2}>
            {Object.entries(triadTypes).map(([triadType, types]) =>
              renderButtons(triadType, types)
            )}
          </Stack>
        )}
        <Spacer />
        <ExtendedChordsSettings setSelectedTypes={setSelectedTypes} />
      </Flex>
    </ButtonContext.Provider>
  );
};

export default ExtendedChordsButtons;
