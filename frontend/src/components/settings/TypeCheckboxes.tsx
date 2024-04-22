import { Box, Button, HStack, Stack, VStack } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";
import SettingsCheckboxGroup from "./SettingsCheckboxGroup";

interface TypeCheckboxesProps {
  types: string[];
  inversions: string[];
  selectedTypesChange: Function;
}

const TypeCheckboxes = ({
  types,
  selectedTypesChange,
  inversions,
}: TypeCheckboxesProps) => {
  const [checkedItems, setCheckedItems] = useState([true, false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const onCheckChildrenChange = (index: number, value: boolean) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = value;
    setCheckedItems(newCheckedItems);
  };

  return (
    <>
      <VStack alignContent={"center"}>
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={() =>
            allChecked
              ? setCheckedItems(Array(types.length).fill(false))
              : setCheckedItems(Array(types.length).fill(true))
          }
        >
          All types
        </Checkbox>
        <HStack
          spacing={4}
          alignContent={"center"}
          justifyContent={"center"}
          flexWrap="wrap"
        >
          {inversions.map((inversion: string, index: number) => (
            <SettingsCheckboxGroup
              key={index}
              types={
                inversion === "Root Position"
                  ? types
                  : types.filter((item) => item !== "Augmented")
              }
              groupName={inversion}
              checkChildren={checkedItems[index]}
              onCheckChildrenChange={(value: boolean) =>
                onCheckChildrenChange(index, value)
              }
              selectedTypesChange={selectedTypesChange}
            />
          ))}
        </HStack>
      </VStack>
    </>
  );
};

export default TypeCheckboxes;
