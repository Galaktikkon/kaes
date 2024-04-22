import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import AdvancedSettingsDropdown from "./AdvancedSettingsDropdown";
import TypeCheckboxes from "./TypeCheckboxes";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";

interface IntervalSettingsProps {
  setSelectedTypes: Function;
}

const IntervalSettings = ({ setSelectedTypes }: IntervalSettingsProps) => {
  // List of triad types
  const intervalTypes: string[] = [
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
  const inversions: string[] = ["Simple Intervals"];

  //   const { updateSelectedTypes } = useContext(ButtonContext);
  const updateSelectedTypes = (groupName: string, types: string[]) => {
    setSelectedTypes(groupName, types);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        as={IconButton}
        colorScheme="teal"
        onClick={onOpen}
        icon={<SettingsIcon boxSize={6} />}
      >
        Open
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Intervals Settings</DrawerHeader>

          <DrawerBody>
            <TypeCheckboxes
              types={intervalTypes}
              inversions={inversions}
              selectedTypesChange={updateSelectedTypes}
            />
            <AdvancedSettingsDropdown />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IntervalSettings;
