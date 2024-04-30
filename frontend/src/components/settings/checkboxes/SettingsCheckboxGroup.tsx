"use client";
import { Checkbox, CheckboxGroup, Stack, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useGameSettingsContext } from "../../context/GameContext";

interface SettingsCheckboxGroupProps {
  groupName: string;
  types: string[];
  checkChildren: boolean;
  onCheckChildrenChange: Function;
}

const SettingsCheckboxGroup = ({
  groupName,
  types,
  checkChildren,
  onCheckChildrenChange,
}: SettingsCheckboxGroupProps) => {
  const [checkedItems, setCheckedItems] = useState(
    Array(types.length).fill(false)
  );
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const game = useGameSettingsContext();

  useEffect(() => {
    if (checkChildren) {
      setCheckedItems(Array(types.length).fill(true));
      game.setExercise(game.exercise.sequenceName, groupName, types);
    } else {
      setCheckedItems(Array(types.length).fill(false));
      game.setExercise(game.exercise.sequenceName, groupName, []);
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

      game.setExercise(
        game.exercise.sequenceName,
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
              game.setExercise(
                game.exercise.sequenceName,
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
};

export default SettingsCheckboxGroup;
