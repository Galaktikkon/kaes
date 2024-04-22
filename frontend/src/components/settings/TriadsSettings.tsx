import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useContext, useState } from "react";
import SettingsCheckboxGroup from "./SettingsCheckboxGroup";
import AdvancedSettingsDropdown from "./AdvancedSettingsDropdown";
import TypeCheckboxes from "./TypeCheckboxes";
import types from "next/types";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import ButtonContext from "../TriadsButtons";

interface TriadsSettingsProps {
  setSelectedTypes: Function;
}

const TriadsSettings = ({ setSelectedTypes }: TriadsSettingsProps) => {
  // List of triad types
  const triadTypes: string[] = ["Major", "Minor", "Diminished", "Augmented"];
  const inversions: string[] = [
    "Root Position",
    "First Inversion",
    "Second Inversion",
  ];

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
        position="fixed"
        top="20px"
        right="20px"
      >
        Open
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top="20px" right="40px" />
          <DrawerHeader>Triads Settings</DrawerHeader>

          <DrawerBody>
            <TypeCheckboxes
              types={triadTypes}
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

export default TriadsSettings;
