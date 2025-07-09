// NoteCard.tsx
import {
  Button,
  Card,
  CardFooter,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface CardProps {
  id: number;
  title: string;
  text: string;
  category: string;
  owner: string;
}

interface NoteCardProps {
  onSave: (note: CardProps) => void;
  selectedNote?: CardProps | null;
  onCancel: () => void;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Text is required"),
  category: z.string().min(1, "Please select a category"),
  owner: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const NoteCard = ({
  onSave,
  selectedNote,
  onCancel,
  onClose,
}: NoteCardProps) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
      category: "",
      owner: "",
    },
  });

  useEffect(() => {
    if (selectedNote) {
      setValue("title", selectedNote.title);
      setValue("text", selectedNote.text);
      setValue("category", selectedNote.category);
      setValue("owner", selectedNote.owner);
    } else {
      reset();
    }
  }, [selectedNote, setValue, reset]);

  const onSubmit = (data: FormData) => {
    const note: CardProps = {
      id: selectedNote?.id || Date.now(),
      ...data,
    };

    onSave(note);

    toast({
      title: selectedNote ? "Note updated." : "Note saved.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    reset();
  };

  return (
    <Card
      borderRadius="xl"
      p={4}
      shadow="md"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.title}>
          <Input
            placeholder="Title..."
            variant="filled"
            {...register("title")}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.text}>
          <Textarea
            placeholder="Your ideas..."
            resize="vertical"
            minH="150px"
            {...register("text")}
          />
          <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.category}>
          <Select placeholder="--- Category ---" {...register("category")}>
            <option value="illustrations">Illustrations</option>
            <option value="spiritual gems">Spiritual Gems</option>
            <option value="watchtower">Watchtower</option>
            <option value="others">Others</option>
          </Select>
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.owner}>
          <Input
            placeholder="Your name..."
            variant="filled"
            {...register("owner")}
          />
          <FormErrorMessage>{errors.owner?.message}</FormErrorMessage>
        </FormControl>

        <CardFooter justifyContent="flex-end" p={0} gap={2}>
          {selectedNote && (
            <Button
              variant="outline"
              onClick={() => {
                reset();
                onCancel();
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" colorScheme="gray" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" colorScheme="blue">
            {selectedNote ? "Update" : "Save"}
          </Button>
        </CardFooter>
      </VStack>
    </Card>
  );
};

export default NoteCard;
