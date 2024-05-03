"use client";
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
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import AdvancedSettingsDropdown from "./advancedSettings/AdvancedSettingsDropdown";
import SequenceTypesCheckboxes from "./Checkboxes/SequenceTypesCheckboxes";

interface ExerciseSettingsDrawerProps {
  exerciseName: string;
  availableSequenceTypes: string[];
  availableGroupTypes: string[];
}

const ExerciseSettingsDrawer = ({
  exerciseName,
  availableSequenceTypes,
  availableGroupTypes,
}: ExerciseSettingsDrawerProps) => {
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

          <DrawerHeader>{exerciseName} Settings</DrawerHeader>

          <DrawerBody>
            <SequenceTypesCheckboxes
              types={availableSequenceTypes}
              groupTypes={availableGroupTypes}
            />
            <AdvancedSettingsDropdown />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ExerciseSettingsDrawer;
