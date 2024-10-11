import { makeAutoObservable, runInAction } from "mobx";
import { booksModel, BooksModel } from "./Books.model";
import { booksRepository, BooksRepository } from "./Books.repository";
import { AddBookDto, Book } from "./Books.type";
import { faker } from "@faker-js/faker";
import { userStore, UserStore } from "../../stores/user.store";

export class BooksController {
  constructor(
    private repository: BooksRepository,
    private model: BooksModel,
    private userStore: UserStore
  ) {
    makeAutoObservable(this);
  }

  async loadAll(): Promise<void> {
    let books: Book[] = [];

    try {
      books = await this.repository.getAll();
    } catch (e) {
      // in this case books should be empty
    }

    runInAction(() => {
      this.model.books = books;
    });
  }

  async loadPrivate(): Promise<void> {
    let books: Book[] = [];

    try {
      books = await this.repository.getPrivate();
    } catch (e) {
      // in this case books should be empty
    }

    runInAction(() => {
      this.model.books = books;
    });
  }

  async addBook(bookDto: AddBookDto): Promise<void> {
    const bookToAdd = {
      ...bookDto,
      // It seems these fields should be populated by backend but it doesnt happend
      id: Date.now(),
      ownerId: this.userStore.userId,
    } as Book;

    const isAdded = await this.repository.add(bookToAdd);

    if (isAdded) {
      await this.loadAll();
    }
  }

  async addRandomBook(): Promise<void> {
    await this.addBook({
      name: faker.lorem.words({ min: 1, max: 5 }),
      author: faker.person.fullName(),
    });
  }
}

export const booksCtrl = new BooksController(
  booksRepository,
  booksModel,
  userStore
);
