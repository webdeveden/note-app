import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  categories: string[];
  selectedCategory: string | null;
  onSelectedCategory: (category: string | null) => void;
}

const SortCategory = ({
  categories,
  selectedCategory,
  onSelectedCategory,
}: Props) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        padding={1}
        marginY={5}
      >
        Sort by: {selectedCategory || "All"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectedCategory(null)}>All</MenuItem>
        {categories.map((cat, index) => (
          <MenuItem
            key={index}
            value={index}
            onClick={() => onSelectedCategory(cat)}
          >
            {cat}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortCategory;
