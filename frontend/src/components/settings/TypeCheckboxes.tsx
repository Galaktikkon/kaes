import { Button, HStack, Stack, VStack } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";
import SettingsCheckboxGroup from "./SettingsCheckboxGroup";

interface TypeCheckboxesProps {
  types: string[];
  inversions: string[];
  updateSelectedTypes: Function;
}

const TypeCheckboxes = ({
  types,
  updateSelectedTypes,
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

  const selectedTypesChange = (groupName: string, types: string[]) => {
    updateSelectedTypes(groupName, types);
  };

  return (
    <>
      <VStack>
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={() =>
            allChecked
              ? setCheckedItems([false, false, false])
              : setCheckedItems([true, true, true])
          }
        >
          All types
        </Checkbox>
        <HStack spacing={3} alignItems="flex-start">
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
