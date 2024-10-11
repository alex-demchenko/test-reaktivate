import { makeAutoObservable } from "mobx";
import { BooksController, booksCtrl } from "../books/Books.ctrl";
import { booksTabsModel, BooksTabsModel, Tabs } from "./BooksTabs.model";

export class BooksTabsController {
  constructor(
    private model: BooksTabsModel,
    private booksCtrl: BooksController
  ) {
    makeAutoObservable(this);
  }

  async setTab(newTab: Tabs): Promise<void> {
    this.model.tab = newTab;

    switch (this.model.tab) {
      case Tabs.All: {
        await this.booksCtrl.loadAll();
        break;
      }
      case Tabs.Private: {
        await this.booksCtrl.loadPrivate();
        break;
      }
      default: {
        throw new Error("Unexpected tab");
      }
    }
  }
}

export const booksTabsCtrl = new BooksTabsController(booksTabsModel, booksCtrl);
