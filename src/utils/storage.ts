// utils/storage.ts
// utils/storage.ts
import type { CardProps } from "../components/NoteCard";

const STORAGE_KEY = "my_notes";

export function saveNotesToStorage(notes: CardProps[]) {
  try {
    const data = JSON.stringify(notes);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error("Failed to save notes to localStorage", error);
  }
}

export function loadNotesFromStorage(): CardProps[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load notes from localStorage", error);
    return [];
  }
}
