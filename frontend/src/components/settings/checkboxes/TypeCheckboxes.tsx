"use client";
import { Box, Button, HStack, Stack, VStack } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";
import SettingsCheckboxGroup from "./SettingsCheckboxGroup";

interface TypeCheckboxesProps {
  types: string[];
  groupTypes: string[];
}

const TypeCheckboxes = ({ types, groupTypes }: TypeCheckboxesProps) => {
  const [checkedItems, setCheckedItems] = useState([true, false, false]);
  const allChecked = checkedItems.some((item) => !item);
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
          {groupTypes.map((groupType: string, index: number) => (
            <SettingsCheckboxGroup
              key={index}
              types={
                groupType === "Root Position"
                  ? types
                  : types.filter((item) => item !== "Augmented")
              }
              groupName={groupType}
              checkChildren={checkedItems[index]}
              onCheckChildrenChange={(value: boolean) =>
                onCheckChildrenChange(index, value)
              }
            />
          ))}
        </HStack>
      </VStack>
    </>
  );
};

export default TypeCheckboxes;
