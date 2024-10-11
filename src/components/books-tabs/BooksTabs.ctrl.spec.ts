import { describe, expect, it, vi } from "vitest";
import { BooksTabsController } from "./BooksTabs.ctrl";
import { BooksTabsModel, Tabs } from "./BooksTabs.model";
import { BooksController, booksCtrl } from "../books/Books.ctrl";
import { booksRepository } from "../books/Books.repository";
import { booksModel } from "../books/Books.model";
import { userStore } from "../../stores/user.store";

describe("setTab", () => {
  it("should change the tab in the model", async () => {
    // arrange
    const model = new BooksTabsModel();
    const controller = new BooksTabsController(model, booksCtrl);

    // act
    await controller.setTab(Tabs.Private);

    // assert
    expect(model.tab).toBe(Tabs.Private);
  });

  it("should load all books when the tab is changed to All", async () => {
    // arrange
    const model = new BooksTabsModel();
    const booksCtrl = new BooksController(
      booksRepository,
      booksModel,
      userStore
    );
    const controller = new BooksTabsController(model, booksCtrl);
    const loadAllSpy = vi
      .spyOn(booksCtrl, "loadAll")
      .mockImplementation(() => {});

    // act
    await controller.setTab(Tabs.All);

    // assert
    expect(loadAllSpy).toHaveBeenCalledOnce();
  });

  it("should private books when the tab is changed to Private", async () => {
    // arrange
    const model = new BooksTabsModel();
    const booksCtrl = new BooksController(
      booksRepository,
      booksModel,
      userStore
    );
    const controller = new BooksTabsController(model, booksCtrl);
    const loadPrivateSpy = vi
      .spyOn(booksCtrl, "loadPrivate")
      .mockImplementation(() => {});

    // act
    await controller.setTab(Tabs.Private);

    // assert
    expect(loadPrivateSpy).toHaveBeenCalledOnce();
  });
});

