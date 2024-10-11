import { makeAutoObservable } from "mobx";
import { ApiGateway, apiGateway } from "../../shared/ApiGateway";
import { AddBookDto, Book } from "./Books.type";
import { UserStore, userStore } from "../../stores/user.store";

const URL_SECTION = "books";

export class BooksRepository {
  books: Book[] = [];

  constructor(private api: ApiGateway, private userStore: UserStore) {
    makeAutoObservable(this);
  }

  async getAll(): Promise<Book[]> {
    return this.api.get(`${URL_SECTION}/${this.userStore.userId}`);
  }

  async getPrivate(): Promise<Book[]> {
    return this.api.get(`${URL_SECTION}/${this.userStore.userId}/private`);
  }

  async add(bookDto: AddBookDto): Promise<boolean> {
    try {
      const addedBook = await this.api.post<AddBookDto, Book>(
        `${URL_SECTION}/${this.userStore.userId}`,
        bookDto
      );

      return Boolean(addedBook);
    } catch (e) {
      return false;
    }
  }
}

export const booksRepository = new BooksRepository(apiGateway, userStore);

