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

interface TriadsSettingsProps {
  setSelectedTypes: Function;
}

const ExtendedChordsSettings = ({ setSelectedTypes }: TriadsSettingsProps) => {
  // List of triad types
  const ExtendedChordsTypes: string[] = [
    "Dominant Seven",
    "Minor Dominant Seven",
    "Half Diminished Seventh",
    "Fully Diminished Seventh",
  ];
  const inversions: string[] = [
    "Root Position",
    "First Inversion",
    "Second Inversion",
    "Third Inversion",
  ];

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
        position="fixed"
        top="20px"
        right="20px"
      >
        Open
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top="20px" right="40px" />
          <DrawerHeader>Extended Chords Settings</DrawerHeader>

          <DrawerBody>
            <TypeCheckboxes
              types={ExtendedChordsTypes}
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

export default ExtendedChordsSettings;
