import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";
import InstrumentMenu from "./IntstrumentMenu";
import TimeInput from "./TimeInput";
import OctaveSlider from "./OctaveSlider";

const AdvancedSettingsDropdown = () => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple paddingTop={10}>
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
            <TimeInput />
            <InstrumentMenu />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedSettingsDropdown;
