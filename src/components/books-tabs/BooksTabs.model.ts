import { makeAutoObservable } from "mobx";

export enum Tabs {
  All = "all",
  Private = "private",
}

export class BooksTabsModel {
  tab = Tabs.All;

  constructor() {
    makeAutoObservable(this);
  }
}

export const booksTabsModel = new BooksTabsModel();
