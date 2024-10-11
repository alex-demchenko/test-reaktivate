import { makeAutoObservable } from "mobx";
import { Book } from "./Books.type";

export class BooksModel {
  books: Book[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export const booksModel = new BooksModel();
