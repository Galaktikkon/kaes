import { Checkbox, CheckboxGroup, Stack, VStack } from "@chakra-ui/react";
import { all } from "axios";
import { tree } from "next/dist/build/templates/app-page";
import { useEffect, useState } from "react";

interface SettingsCheckboxGroupProps {
  groupName: string;
  types: string[];
  checkChildren: boolean;
  onCheckChildrenChange: Function;
  selectedTypesChange: Function;
}

const SettingsCheckboxGroup = ({
  groupName,
  types,
  checkChildren,
  onCheckChildrenChange,
  selectedTypesChange,
}: SettingsCheckboxGroupProps) => {
  const [checkedItems, setCheckedItems] = useState(
    Array(types.length).fill(false)
  );
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  useEffect(() => {
    if (checkChildren) {
      setCheckedItems(Array(types.length).fill(true));
      selectedTypesChange(groupName, types);
    } else {
      setCheckedItems(Array(types.length).fill(false));
      selectedTypesChange(groupName, []);
    }
  }, [checkChildren, types.length]);

  const handleCheckboxChange =
    (index: number) => (e: { target: { checked: any } }) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = e.target.checked;
      setCheckedItems(newCheckedItems);
      if (newCheckedItems.every(Boolean)) {
        onCheckChildrenChange(true);
      } else if (!newCheckedItems.some(Boolean)) {
        onCheckChildrenChange(false);
      }
      selectedTypesChange(
        groupName,
        types.filter((type, index) => Boolean(newCheckedItems[index]))
      );
    };

  return (
    <>
      <CheckboxGroup>
        <VStack>
          <Checkbox
            whiteSpace={"nowrap"}
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={() => {
              if (checkChildren) {
                setCheckedItems(Array(types.length).fill(false));
                onCheckChildrenChange(false);
              } else {
                setCheckedItems(Array(types.length).fill(true));
                onCheckChildrenChange(true);
              }
              selectedTypesChange(
                groupName,
                types.filter((type, index) => Boolean(checkedItems[index]))
              );
            }}
          >
            {groupName}
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {types.map((type, index) => (
              <Checkbox
                whiteSpace={"nowrap"}
                isChecked={checkedItems[index]}
                onChange={handleCheckboxChange(index)}
              >
                {type}
              </Checkbox>
            ))}
          </Stack>
        </VStack>
      </CheckboxGroup>
    </>
  );
};

export default SettingsCheckboxGroup;
