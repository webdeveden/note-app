import { Box, HStack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

const CreateNote = ({ onClick }: Props) => {
  return (
    <Box mt={5} display="flex" justifyContent="center">
      <Box
        border="2px dashed"
        borderColor="gray.300"
        padding="0.5rem"
        width="100%"
        // maxW="400px" // optional: control the max width on large screens
        textAlign="center"
        cursor="pointer"
        onClick={onClick}
      >
        <HStack justify="center">
          <FaPlus />
          <Text>Create note</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default CreateNote;
