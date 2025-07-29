import {
  Card,
  CardBody,
  Heading,
  VStack,
  Text,
  Divider,
  CardFooter,
  Button,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  //   ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import type { CardProps } from "./NoteCard";

interface ShowNoteProps {
  note: CardProps;
  onClose: () => void;
  isOpen?: boolean; // Only used on mobile
}

const ShowNote = ({ note, onClose, isOpen }: ShowNoteProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (isMobile) {
    return (
      <Modal isOpen={!!isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {note.title[0].toUpperCase() + note.title.slice(1)}
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Text fontWeight="bold">Category: {note.category}</Text>
              <Text whiteSpace="pre-wrap">{note.text}</Text>
              <Divider />
              <Text fontSize="sm" color="gray.500">
                By: {note.owner || "N/A"}
              </Text>
              <Button mt={4} onClick={onClose}>
                Close
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  // Desktop (aside panel)
  return (
    <Card
      borderRadius="20px"
      w="full"
      p={4}
      alignContent="center"
      mr={0}
      maxH="100%"
      overflowY="auto"
    >
      <VStack align="stretch" spacing={4}>
        <Heading size="md">
          {note.title[0].toUpperCase() + note.title.slice(1)}
        </Heading>
        <Text fontWeight="medium" color="gray.600">
          Category: {note.category}
        </Text>
        <CardBody p={0}>
          <Text whiteSpace="pre-wrap">{note.text}</Text>
        </CardBody>
        <Divider />
        <CardFooter p={0} pt={2} justifyContent="space-between">
          <Text fontSize="sm" color="gray.500">
            By: {note.owner || "N/A"}
          </Text>
          <Button onClick={onClose} size="sm">
            Close
          </Button>
        </CardFooter>
      </VStack>
    </Card>
  );
};

export default ShowNote;
