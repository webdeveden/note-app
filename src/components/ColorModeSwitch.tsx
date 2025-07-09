import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

function ColorModeSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        colorScheme="purple"
        isChecked={colorMode == "dark"}
        onChange={toggleColorMode}
      ></Switch>
      <Text whiteSpace="nowrap" marginY={1}>
        Dark Mode
      </Text>
    </HStack>
  );
}

export default ColorModeSwitch;
