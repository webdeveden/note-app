// types.ts
export interface CardProps {
  id: number;
  title: string;
  text: string;
  category: string;
  owner: string;
}

import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Text is required"),
  category: z.string().min(1, "Select a category"),
  owner: z.string().min(1, "Owner is required"),
});

export type NoteFormData = z.infer<typeof noteSchema>;
