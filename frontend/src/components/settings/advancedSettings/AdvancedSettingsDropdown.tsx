import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  VStack,
} from "@chakra-ui/react";
import InstrumentMenu from "./IntstrumentMenu";
import OctaveSlider from "./OctaveSlider";
import NoteDurationInput from "./NoteDurationInput";

const AdvancedSettingsDropdown = () => {
  return (
    <Accordion defaultIndex={-1} paddingTop={10} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Advanced Settings
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack>
            <OctaveSlider />
            <NoteDurationInput />
            <InstrumentMenu />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedSettingsDropdown;
