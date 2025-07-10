import { Box, HStack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

const CreateNote = ({ onClick }: Props) => {
  return (
    <Box justifyItems="left" paddingLeft={0} marginTop={5}>
      <Box
        border="2px dashed "
        borderColor="gray.300"
        width="50px"
        justifyContent="center"
        justifyItems="center"
        alignItems="center"
        padding="0.5rem"
        w="100%"
        onClick={onClick}
        cursor="pointer"
      >
        <HStack>
          <FaPlus />
          <Text>Create note</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default CreateNote;
