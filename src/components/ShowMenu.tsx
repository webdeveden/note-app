// CategoryListDrawer.tsx
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  // DrawerCloseButton,
  //   DrawerHeader,
  useColorModeValue,
  VStack,
  DrawerFooter,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import CategoryList from "./CategoryList";
import Recycle from "./Recycle";
import type { CardProps } from "./NoteCard";

interface Props {
  isOpen: boolean;
  showRecycle: boolean; // Optional prop to show Recycle Bin
  onClose: () => void;
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  deletedNotes: CardProps[];
  onSelect: () => void; // Optional prop for handling selection in Recycle
  onUndo: (id: number) => void;
}

const ShowMenu = ({
  isOpen,
  showRecycle,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  deletedNotes,
  onSelect,
  onUndo,
}: Props) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue("gray.50", "gray.800")}>
        {/* <DrawerCloseButton /> */}
        {/* <DrawerHeader>Categories</DrawerHeader> */}
        <DrawerBody>
          <VStack align="stretch" spacing={2}>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                onSelectCategory(cat);
                onClose(); // optional: close drawer after selecting category
              }}
            />

            <Recycle
              notes={showRecycle ? deletedNotes : []}
              onSelect={onSelect}
              onUndo={onUndo}
            />
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <HStack
            justifyContent="left"
            spacing={3}
            fontSize="sm"
            flexWrap="nowrap"
          >
            <Text whiteSpace="nowrap">© {new Date().getFullYear()} iEden</Text>

            <Link href="/terms" _hover={{ textDecoration: "underline" }}>
              Terms of Service
            </Link>
            <Link
              href="https://github.com/webdeveden?tab=repositories"
              isExternal
            >
              GitHub
            </Link>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShowMenu;
