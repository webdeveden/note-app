import { Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import { MdMiscellaneousServices } from "react-icons/md";
import { SiWatchtower } from "react-icons/si";
import { LuGem } from "react-icons/lu";
import { PiSlideshowBold } from "react-icons/pi";
import { TbCategoryFilled } from "react-icons/tb";
import { BsListUl } from "react-icons/bs";

interface Props {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

// Normalize category keys for icons
const categoryIcons: Record<string, React.ElementType> = {
  all: BsListUl,
  illustrations: PiSlideshowBold,
  "spiritual gems": LuGem,
  watchtower: SiWatchtower,
  others: MdMiscellaneousServices,
};

const normalize = (str: string) => str.toLowerCase();

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const CategoryList = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: Props) => {
  return (
    <List spacing={3} marginY={5}>
      <ListItem fontSize="xl" fontWeight="bold" pb={4}>
        <ListIcon as={TbCategoryFilled} fontSize="2xl" />
        Categories
      </ListItem>
      {categories.map((cat) => {
        const normalized = normalize(cat);
        const isSelected = selectedCategory === cat;
        const Icon = categoryIcons[normalized] || TbCategoryFilled;

        return (
          <Box key={cat} cursor="pointer" paddingX={5}>
            <ListItem
              display="flex"
              alignItems="center"
              gap={2}
              onClick={() => onSelectCategory(cat)}
              color={isSelected ? "orange.400" : "inherit"}
              fontWeight={isSelected ? "semibold" : "normal"}
            >
              <ListIcon as={Icon} fontSize="xl" />
              {capitalize(cat)}
            </ListItem>
          </Box>
        );
      })}
    </List>
  );
};

export default CategoryList;
