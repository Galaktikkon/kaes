"use client";

import { Checkbox, CheckboxGroup, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameSettings from "../../context/GameContext";
import { observer } from "mobx-react";

interface SettingsCheckboxGroupProps {
  groupName: string;
  types: string[];
  checkChildren: boolean;
  onCheckChildrenChange: Function;
}

const SettingsCheckboxGroup = observer(
  ({
    groupName,
    types,
    checkChildren,
    onCheckChildrenChange,
  }: SettingsCheckboxGroupProps) => {
    const [checkedItems, setCheckedItems] = useState(
      Array(types.length)
        .fill(false)
        .map((value, index) => {
          console.log(
            "sequenceTypes: ",
            GameSettings.exercise.sequenceTypes[groupName],
            GameSettings.exercise.sequenceTypes,
            groupName
          );
          return GameSettings.exercise.sequenceTypes[groupName].includes(
            types[index]
          );
        })
    );
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    useEffect(() => {
      if (checkChildren) {
        setCheckedItems(Array(types.length).fill(true));
        GameSettings.setExercise(
          GameSettings.exercise.sequenceName,
          groupName,
          types
        );
      } else if (!checkChildren && !isIndeterminate) {
        setCheckedItems(Array(types.length).fill(false));
        GameSettings.setExercise(
          GameSettings.exercise.sequenceName,
          groupName,
          []
        );
      }
    }, [checkChildren]);

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

        GameSettings.setExercise(
          GameSettings.exercise.sequenceName,
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
                GameSettings.setExercise(
                  GameSettings.exercise.sequenceName,
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
                  key={index}
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
  }
);

export default SettingsCheckboxGroup;
