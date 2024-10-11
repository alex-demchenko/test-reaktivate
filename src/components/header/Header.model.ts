import { makeAutoObservable } from "mobx";
import { userStore, UserStore } from "../../stores/user.store";
import { booksModel, BooksModel } from "../books/Books.model";

export class HeaderModel {
  constructor(public booksModel: BooksModel, public userStore: UserStore) {
    makeAutoObservable(this);
  }

  get userBooks(): number {
    return this.booksModel.books.filter(
      (book) => book.ownerId === this.userStore.userId
    ).length;
  }
}

export const headerModel = new HeaderModel(booksModel, userStore);
