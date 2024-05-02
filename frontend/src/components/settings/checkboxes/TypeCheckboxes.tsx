"use client";
import { HStack, VStack } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import SettingsCheckboxGroup from "./SettingsCheckboxGroup";
import { observer } from "mobx-react";

interface TypeCheckboxesProps {
  types: string[];
  groupTypes: string[];
}

const TypeCheckboxes = observer(
  ({ types, groupTypes }: TypeCheckboxesProps) => {
    const [checkedGroupTypes, setCheckedGroupTypes] = useState(
      Array(groupTypes.length).fill(false)
    );
    const allParentChecked = checkedGroupTypes.every(Boolean);
    const isParentIndeterminate =
      checkedGroupTypes.some(Boolean) && !allParentChecked;

    const onCheckChildrenChange = (index: number, value: boolean) => {
      const newCheckedGroupTypes = [...checkedGroupTypes];
      newCheckedGroupTypes[index] = value;
      setCheckedGroupTypes(newCheckedGroupTypes);
    };

    return (
      <>
        <VStack alignContent={"center"}>
          <Checkbox
            isChecked={allParentChecked}
            isIndeterminate={isParentIndeterminate}
            onChange={({ target: { checked } }) =>
              setCheckedGroupTypes(Array(groupTypes.length).fill(checked))
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
                checkChildren={checkedGroupTypes[index]}
                onCheckChildrenChange={(value: boolean) =>
                  onCheckChildrenChange(index, value)
                }
              />
            ))}
          </HStack>
        </VStack>
      </>
    );
  }
);

export default TypeCheckboxes;
