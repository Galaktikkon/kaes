"use client";
import { HStack, VStack } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import game from "../../../state/Game";
import GroupTypesCheckboxes from "./GroupTypesCheckboxes";

interface SequenceTypesCheckboxesProps {
  types: string[];
  groupTypes: string[];
}

const SequenceTypesCheckboxes = ({
  types,
  groupTypes,
}: SequenceTypesCheckboxesProps) => {
  const [optionsChecked, setOptionChecked] = useState<{
    [key: string]: boolean[];
  }>(
    groupTypes.reduce((acc, name) => {
      return {
        ...acc,
        [name]: Array(
          name === "Root Position"
            ? types.length
            : types.filter((item) => item !== "Augmented").length
        )
          .fill(false)
          .map((_, index) => {
            return game.settings.exercise.sequenceTypes[name].includes(
              types[index]
            );
          }),
      };
    }, {})
  );

  const setParentCheckbox = (value: boolean) => {
    setOptionChecked(
      groupTypes.reduce((acc, name) => {
        return {
          ...acc,
          [name]: Array(
            name === "Root Position"
              ? types.length
              : types.filter((item) => item !== "Augmented").length
          ).fill(value),
        };
      }, {})
    );
  };

  const isParentChecked = () => {
    for (const name of groupTypes) {
      if (optionsChecked[name].includes(false)) {
        return false;
      }
    }
    return true;
  };

  const setGroupCheckbox = (groupName: string, value: boolean) => {
    setOptionChecked({
      ...optionsChecked,
      [groupName]: Array(
        groupName === "Root Position"
          ? types.length
          : types.filter((item) => item !== "Augmented").length
      ).fill(value),
    });
  };

  const isGroupChecked = (groupName: string) => {
    return !optionsChecked[groupName].includes(false);
  };

  const setTypeCheckbox = (groupName: string, type: string, value: boolean) => {
    const index = types.indexOf(type);
    const prevArray = [...optionsChecked[groupName]];
    prevArray[index] = value;
    setOptionChecked({
      ...optionsChecked,
      [groupName]: prevArray,
    });
  };

  const isTypeCheckbox = (groupName: string, type: string) => {
    const index = types.indexOf(type);
    const prevArray = [...optionsChecked[groupName]];
    return prevArray[index];
  };

  useEffect(() => {
    for (const name of groupTypes) {
      game.settings.setSequenceTypes(
        name,
        types.filter((type, index) => optionsChecked[name][index])
      );
    }
  }, [optionsChecked]);

  const isParentIndeterminate = () => {
    return (
      (groupTypes.some(isGroupChecked) ||
        groupTypes.some(isGroupIndeterminate)) &&
      !isParentChecked()
    );
  };

  const isGroupIndeterminate = (groupName: string) => {
    return (
      optionsChecked[groupName].some(Boolean) &&
      !optionsChecked[groupName].every(Boolean)
    );
  };

  return (
    <>
      <VStack alignContent={"center"}>
        <Checkbox
          isChecked={isParentChecked()}
          isIndeterminate={isParentIndeterminate()}
          onChange={({ target: { checked } }) => setParentCheckbox(checked)}
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
            <GroupTypesCheckboxes
              key={index}
              types={
                groupType === "Root Position"
                  ? types
                  : types.filter((item) => item !== "Augmented")
              }
              groupName={groupType}
              isGroupCheckbox={isGroupChecked}
              setGroupCheckbox={setGroupCheckbox}
              isTypeCheckbox={isTypeCheckbox}
              setTypeCheckbox={setTypeCheckbox}
              isGroupIndeterminate={isGroupIndeterminate}
            />
          ))}
        </HStack>
      </VStack>
    </>
  );
};

export default SequenceTypesCheckboxes;
