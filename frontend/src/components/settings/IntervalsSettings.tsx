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
import AdvancedSettingsDropdown from "./AdvancedSettingsDropdown";
import TypeCheckboxes from "./TypeCheckboxes";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";

const IntervalSettings = () => {
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

          <DrawerHeader>Intervals Settings</DrawerHeader>

          <DrawerBody>
            <TypeCheckboxes types={intervalTypes} inversions={inversions} />
            <AdvancedSettingsDropdown />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IntervalSettings;
