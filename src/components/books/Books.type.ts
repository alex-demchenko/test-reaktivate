export interface Book {
  id: number;
  name: string;
  author: string;
  ownerId: string;
}

export type AddBookDto = Omit<Book, "id" | "ownerId">;
