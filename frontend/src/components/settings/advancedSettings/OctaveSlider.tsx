import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Flex,
} from "@chakra-ui/react";
import { Label } from "@mui/icons-material";
import { useState } from "react";

const OctaveSlider = () => {
  const [sliderValue, setSliderValue] = useState([3, 5]);
  return (
    <Flex padding={5}>
      <RangeSlider
        defaultValue={sliderValue}
        min={0}
        max={8}
        step={1}
        onChange={setSliderValue}
        w={150}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={5} index={0} textColor={"black"}>
          {sliderValue[0]}
        </RangeSliderThumb>

        <RangeSliderThumb boxSize={5} index={1} textColor={"black"}>
          {sliderValue[1]}
        </RangeSliderThumb>
      </RangeSlider>
    </Flex>
  );
};
export default OctaveSlider;
