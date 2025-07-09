import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  Grid,
  GridItem,
  Heading,
  Show,
  SimpleGrid,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import NoteCard, { type CardProps } from "./components/NoteCard";
import NoteContent from "./components/NoteContent";
import ShowNote from "./components/ShowNote";
import { loadNotesFromStorage, saveNotesToStorage } from "./utils/storage";
import CreateNote from "./components/CreateNote";
import SortCategory from "./components/SortCategory";
import Footer from "./components/Footer";

function App() {
  const [notes, setNotes] = useState<CardProps[]>([]);
  const [allNotes, setAllNotes] = useState<CardProps[]>([]);
  const [selectedNote, setSelectedNote] = useState<CardProps | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeNoteForView, setActiveNoteForView] = useState<CardProps | null>(
    null
  );
  const [isNew, setIsNew] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null); // for highlight & scroll
  const [filterCategory, setFilterCategory] = useState<string | null>(null); // for filtering notes

  const handleSave = (note: CardProps) => {
    if (selectedNote) {
      const updated = allNotes.map((n) => (n.id === note.id ? note : n));
      setAllNotes(updated);
      setNotes(updated);
      setSelectedNote(null);
    } else {
      const updated = [...allNotes, note];
      setAllNotes(updated);
      setNotes(updated);
    }
    setIsNew(false);
  };

  const handleDelete = (id: number) => {
    const updated = allNotes.filter((n) => n.id !== id);
    setAllNotes(updated);
    setNotes(updated);
  };

  const handleEdit = (note: CardProps) => {
    setIsNew(true);
    setSelectedNote(note);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewForm = () => {
    setIsNew(true);
    setSelectedNote(null);
  };

  const handleViewNote = (note: CardProps) => {
    setActiveNoteForView(note);
    if (isMobile) {
      onOpen();
    }
  };

  const handleCloseView = () => {
    setActiveNoteForView(null);
    if (isMobile) {
      onClose();
    }
  };

  // Render notes conditionally based on filterCategory

  const handleFilterCategory = (category: string | null) => {
    setFilterCategory(category);
  };

  // categorylist clicked

  const handleScrollTo = (category: string) => {
    setCurrentCategory(category);

    if (category === "All") {
      const mainContainer = document.getElementById("main-container");
      if (mainContainer) {
        mainContainer.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const section = document.getElementById(category);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // handle search
  const handleSearch = (search: string) => {
    const trimmed = search.trim().toLowerCase();

    if (!trimmed) {
      setNotes(allNotes);
      return;
    }

    // filtering notes

    const filtered = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(trimmed) ||
        note.text.toLowerCase().includes(trimmed)
    );

    setNotes(filtered);
  };

  // grouping categories and it's note content

  const grouped = notes.reduce<Record<string, CardProps[]>>((acc, note) => {
    acc[note.category] = acc[note.category] || [];
    acc[note.category].push(note);
    return acc;
  }, {});

  const sortedGrouped = Object.entries(grouped).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const filteredGrouped = filterCategory
    ? sortedGrouped.filter(([cat]) => cat === filterCategory)
    : sortedGrouped;

  useEffect(() => {
    const stored = loadNotesFromStorage();
    setAllNotes(stored);
    setNotes(stored);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveNotesToStorage(allNotes);
    }
  }, [allNotes, isLoaded]);

  return (
    <>
      <Box padding={5}>
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: activeNoteForView
              ? `"nav nav nav " "asideLeft  main asideRight"`
              : `"nav nav" "asideLeft main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: activeNoteForView ? "auto  1fr 400px" : "auto 1fr",
          }}
          templateRows={{ base: "auto 1fr", lg: "auto 1fr" }}
          height="100vh"
          overflowY={activeNoteForView ? "hidden" : "auto"}
          gap={4}
        >
          <GridItem area="nav">
            <NavBar onSearch={handleSearch} />
          </GridItem>
          <Show above="lg">
            <GridItem area="asideLeft">
              <CategoryList
                categories={[
                  "All",
                  "illustrations",
                  "spiritual gems",
                  "others",
                  "watchtower",
                ].sort()}
                selectedCategory={currentCategory}
                onSelectCategory={handleScrollTo}
              />
            </GridItem>
            {/* <GridItem area="divider" bg="gray.200" width="1px" /> */}
          </Show>
          <GridItem
            area="main"
            overflowY="auto"
            px={5}
            ref={mainContentRef}
            id="main-container"
          >
            <CreateNote onClick={handleViewForm} />
            <SortCategory
              categories={Object.keys(grouped).sort()}
              selectedCategory={filterCategory}
              onSelectedCategory={handleFilterCategory}
            />
            <VStack spacing={6} align="stretch">
              {isNew && (
                <NoteCard
                  onSave={handleSave}
                  selectedNote={selectedNote}
                  onCancel={() => setSelectedNote(null)}
                  onClose={() => setIsNew(false)}
                />
              )}
              {filteredGrouped.map(([category, categoryNotes]) => (
                <Box key={category} id={category}>
                  <Heading size="md" mb={2}>
                    {category[0].toUpperCase() + category.slice(1)}
                  </Heading>
                  <SimpleGrid
                    columns={activeNoteForView ? [1, 2, 3] : [1, 2, 3, 3, 4]}
                    spacing={4}
                    alignItems="start"
                  >
                    {categoryNotes.map((note) => (
                      <Box
                        key={note.id}
                        onClick={() => handleViewNote(note)}
                        cursor="pointer"
                      >
                        <NoteContent
                          {...note}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          isSelected={activeNoteForView?.id === note.id}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              ))}
            </VStack>
          </GridItem>
          {!isMobile && activeNoteForView && (
            <>
              <GridItem
                area="asideRight"
                overflowY="auto"
                bg="gray.600"
                px={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <ShowNote note={activeNoteForView} onClose={handleCloseView} />
              </GridItem>
              {/* <GridItem area="main" padding="10px" /> */}
            </>
          )}
        </Grid>
        {isMobile && activeNoteForView && (
          <Card>
            <ShowNote
              note={activeNoteForView}
              isOpen={isOpen}
              onClose={handleCloseView}
            />
          </Card>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default App;
