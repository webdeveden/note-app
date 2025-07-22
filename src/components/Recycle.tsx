import {
  Button,
  HStack,
  List,
  ListIcon,
  ListItem,
  Tooltip,
} from "@chakra-ui/react";
import type { CardProps } from "./NoteCard";
import { BsChevronDown } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { GrUndo } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface RecycleProps {
  notes: CardProps[];
  onSelect: () => void;
  onUndo: (id: number) => void;
}

const Recycle = ({ notes, onSelect, onUndo }: RecycleProps) => {
  return (
    <>
      <Button
        rightIcon={<BsChevronDown />}
        leftIcon={<MdOutlineDeleteOutline size="20px" />}
        onClick={onSelect}
        justifyContent="flex-start"
        padding={1}
        // marginY={5}
      >
        Recycle Bin
      </Button>

      <List paddingLeft={5} spacing={0} marginY={2}>
        {notes.map((note) => (
          <>
            <ListItem
              key={note.id}
              display="flex"
              justifyContent="space-between"
            >
              <HStack justifyContent="space-between" w="100%" fontSize={"sm"}>
                <div>
                  <ListIcon
                    as={FaRegTimesCircle}
                    color="red.400"
                    whiteSpace="pre-wrap"
                  />
                  <span className="deleted-note-title">
                    {note.title.length <= 10
                      ? note.title
                      : note.title.substring(0, 10) + "..."}
                  </span>
                </div>
                <Tooltip label="restore" hasArrow placement="right">
                  <span>
                    <GrUndo
                      color="orange"
                      size="20px"
                      onClick={() => onUndo(note.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </Tooltip>
              </HStack>
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
};

export default Recycle;
