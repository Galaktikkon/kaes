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
            <NoteDurationInput />
            <InstrumentMenu />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AdvancedSettingsDropdown;
