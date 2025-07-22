import { HStack, Image, useBreakpointValue } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";
import { FiMenu } from "react-icons/fi";

interface Props {
  onSearch: (searchText: string) => void;
  onMenuClick?: () => void; // Optional prop for mobile menu click
}

const NavBar = ({ onSearch, onMenuClick }: Props) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (isMobile) {
    return (
      <HStack justifyContent="space-between">
        <FiMenu size="40px" onClick={onMenuClick} cursor="pointer" />
        {/* <Image src={logo} boxSize="60px" /> */}
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
      </HStack>
    );
  }
  return (
    <HStack justifyContent="space-between" paddingY={5}>
      <Image src={logo} boxSize="60px" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
