import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import PianoIcon from "@mui/icons-material/Piano";
const InstrumentMenu = () => {
  return (
    <Flex padding={5}>
      <Menu>
        <MenuButton whiteSpace={"nowrap"}>Instrument Type</MenuButton>
        <MenuList>
          <MenuItem>Piano</MenuItem>
          <MenuItem>Guitar</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default InstrumentMenu;
