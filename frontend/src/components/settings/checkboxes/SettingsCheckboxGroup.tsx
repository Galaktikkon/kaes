"use client";

import { Checkbox, CheckboxGroup, Stack, VStack } from "@chakra-ui/react";

interface SettingsCheckboxGroupProps {
  groupName: string;
  types: string[];
  isGroupCheckbox: Function;
  setGroupCheckbox: Function;
  isTypeCheckbox: Function;
  setTypeCheckbox: Function;
  isGroupIndeterminate: Function;
}

const SettingsCheckboxGroup = ({
  groupName,
  types,
  isGroupCheckbox,
  setGroupCheckbox,
  isTypeCheckbox,
  setTypeCheckbox,
  isGroupIndeterminate,
}: SettingsCheckboxGroupProps) => {
  return (
    <>
      <CheckboxGroup>
        <VStack>
          <Checkbox
            whiteSpace={"nowrap"}
            isIndeterminate={isGroupIndeterminate(groupName)}
            isChecked={isGroupCheckbox(groupName)}
            onChange={({ target: { checked } }) => {
              setGroupCheckbox(groupName, checked);
            }}
          >
            {groupName}
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {types.map((type, index) => (
              <Checkbox
                key={index}
                whiteSpace={"nowrap"}
                isChecked={isTypeCheckbox(groupName, type)}
                onChange={({ target: { checked } }) =>
                  setTypeCheckbox(groupName, type, checked)
                }
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
