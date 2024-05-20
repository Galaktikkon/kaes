import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import game from "../../../State/Game";
import { PIANO_KEYS } from "../../../../app/config";
const OctaveSlider = () => {
  const [sliderValue, setSliderValue] = useState<[number, number]>([
    PIANO_KEYS.indexOf("C3"),
    PIANO_KEYS.indexOf("C5"),
  ]);

  return (
    <VStack padding={5}>
      <Text mb={2}>Octave Range:</Text>
      <RangeSlider
        defaultValue={[PIANO_KEYS.indexOf("C3"), PIANO_KEYS.indexOf("C5")]}
        min={0}
        max={PIANO_KEYS.length - 1}
        step={1}
        onChange={(value) => {
          setSliderValue([value[0], value[1]]);
          game.settings.setPlaySettings({
            octaveRange: [PIANO_KEYS[value[0]], PIANO_KEYS[value[1]]],
          });
        }}
        w={200}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack bg="cyan" />
        </RangeSliderTrack>
        <RangeSliderThumb
          boxSize={8}
          index={0}
          textColor={"black"}
          justifyContent={"center"}
        >
          {PIANO_KEYS[sliderValue[0]]}
        </RangeSliderThumb>

        <RangeSliderThumb
          boxSize={8}
          index={1}
          textColor={"black"}
          justifyContent={"center"}
        >
          {PIANO_KEYS[sliderValue[1]]}
        </RangeSliderThumb>
      </RangeSlider>
    </VStack>
  );
};

export default OctaveSlider;
