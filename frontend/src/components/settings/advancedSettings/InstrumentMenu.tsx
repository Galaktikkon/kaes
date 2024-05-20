import { useConfigContext } from "@/app/configProvider";
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
const InstrumentMenu = () => {
  const config = useConfigContext();

  return (
    <Flex padding={5}>
      <Menu>
        <MenuButton whiteSpace={"nowrap"}>Instrument Type</MenuButton>
        <MenuList>
          {Object.keys(config.Instruments.Types).map((instrument, idx) => (
            <MenuItem key={idx}>{instrument}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default InstrumentMenu;
