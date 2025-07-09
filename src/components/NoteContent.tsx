import {
  Card,
  CardBody,
  Heading,
  VStack,
  Text,
  Divider,
  CardFooter,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { CardProps } from "./NoteCard";

interface NoteContentProps extends CardProps {
  onDelete: (id: number) => void;
  onEdit: (note: CardProps) => void;
  isSelected?: boolean;
}

const NoteContent = ({
  id,
  title,
  text,
  category,
  owner,
  isSelected,
  onDelete,
  onEdit,
}: NoteContentProps) => {
  return (
    <Card
      borderRadius="md"
      w="full"
      display="flex"
      flexDirection="column"
      boxShadow="1px 2px 5px rgba(0, 0, 0, 0.2)"
      p={2}
      border={isSelected ? "2px solid orange" : ""}
    >
      <VStack align="stretch" spacing={3}>
        <Heading size="md">{title}</Heading>
        <CardBody p={0} flex="1">
          <Text>
            {/* remove indentation */}
            {text.length <= 200 ? text : text.substring(0, 200) + "..."}
          </Text>
        </CardBody>
        <Divider />
      </VStack>
      <CardFooter pt={2} pb={0}>
        <HStack justifyContent="space-between" w="100%" align="center">
          <Text fontSize="sm" color="gray.500">
            By: {owner || "N/A"}
          </Text>
          <HStack gap={2} flexWrap="wrap">
            <IconButton
              aria-label="Like"
              icon={<FaHeart />}
              variant="ghost"
              size="sm"
            />
            <IconButton
              aria-label="Edit"
              icon={<FaEdit />}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); //prevents the click from reaching the parent Box or div that also has an onClick which opens the modal.
                onEdit({ id, title, text, category, owner }); //
              }}
            />
            <IconButton
              aria-label="Delete"
              icon={<MdDelete />}
              variant="ghost"
              size="sm"
              color="tomato"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            />
          </HStack>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default NoteContent;
