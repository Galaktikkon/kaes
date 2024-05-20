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
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import AdvancedSettingsDropdown from "./AdvancedSettings/AdvancedSettingsDropdown";
import SequenceTypesCheckboxes from "./Checkboxes/SequenceTypesCheckboxes";
import game from "@/src/State/Game";

interface ExerciseSettingsDrawerProps {
  exerciseName: string;
  availableSequenceTypes: { [groupName: string]: { [type: string]: string } };
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
      <Flex
        justify="flex-end"
        position="absolute"
        top="65"
        right="0"
        padding={5}
      >
        <Button
          as={IconButton}
          colorScheme="teal"
          onClick={() => {
            onOpen();
            game.setIsActive(false);
            game.setCurrentQuestion([]);
          }}
          icon={<SettingsIcon boxSize={6} />}
        >
          Open
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top="20px" right="40px" />

          <DrawerHeader>{exerciseName} Settings</DrawerHeader>

          <DrawerBody>
            <SequenceTypesCheckboxes
              sequences={availableSequenceTypes}
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
