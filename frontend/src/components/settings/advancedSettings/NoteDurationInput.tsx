import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import game from "../../../State/Game";
const NoteDurationInput = () => {
  return (
    <Stack padding={5}>
      <Text mb={2}>Note duration:</Text>
      <NumberInput
        defaultValue={2}
        min={0.5}
        max={3}
        step={0.5}
        clampValueOnBlur={false}
        onChange={(value) => {
          game.settings.setPlaySettings({ noteDuration: Number(value) });
        }}
      >
        <NumberInputField w={20} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  );
};
export default NoteDurationInput;
