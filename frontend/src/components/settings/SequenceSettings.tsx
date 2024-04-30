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
import AdvancedSettingsDropdown from "./advancedSettings/AdvancedSettingsDropdown";
import TypeCheckboxes from "./checkboxes/TypeCheckboxes";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";

interface SequenceTypesSettingsProps {
  sequenceName: string;
  sequenceTypes: string[];
  groupTypes: string[];
}

const SequenceTypesSettings = ({
  sequenceName,
  sequenceTypes,
  groupTypes,
}: SequenceTypesSettingsProps) => {
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

          <DrawerHeader>{sequenceName} Settings</DrawerHeader>

          <DrawerBody>
            <TypeCheckboxes types={sequenceTypes} groupTypes={groupTypes} />
            <AdvancedSettingsDropdown />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SequenceTypesSettings;
