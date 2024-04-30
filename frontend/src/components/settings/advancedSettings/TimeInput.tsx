import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
const TimeInput = () => {
  return (
    <Stack>
      <Flex padding={5}>
        <NumberInput
          defaultValue={2}
          min={0.5}
          max={3}
          step={0.5}
          clampValueOnBlur={false}
        >
          <NumberInputField w={20} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </Stack>
  );
};
export default TimeInput;
