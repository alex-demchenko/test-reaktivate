import { describe, expect, it, vi } from "vitest";
import { BooksRepository } from "./Books.repository";
import { ApiGateway } from "../../shared/ApiGateway";
import { userStore } from "../../stores/user.store";
import { BooksController } from "./Books.ctrl";
import { BooksModel } from "./Books.model";

describe("loadAll", () => {
  it("should get all books from the repository one time", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const controller = new BooksController(
      repository,
      new BooksModel(),
      userStore
    );
    const getAllSpy = vi.spyOn(repository, "getAll");

    // act
    await controller.loadAll();

    // assert
    expect(getAllSpy).toHaveBeenCalledOnce();
  });

  it("should save loaded books to the model", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const model = new BooksModel();
    const controller = new BooksController(repository, model, userStore);
    vi.spyOn(repository, "getAll").mockResolvedValue([
      {
        id: 1,
        author: "Taras Shevchenko",
        name: "Kobzar",
        ownerId: "alex",
      },
    ]);

    // act
    await controller.loadAll();

    // assert
    expect(model.books).toStrictEqual([
      {
        id: 1,
        author: "Taras Shevchenko",
        name: "Kobzar",
        ownerId: "alex",
      },
    ]);
  });

  it("should empty list of books when cant load them from the backend", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const model = new BooksModel();
    const controller = new BooksController(repository, model, userStore);
    vi.spyOn(repository, "getAll").mockImplementation(async () => {
      throw new Error("Some error");
    });

    // act
    await controller.loadAll();

    // assert
    expect(model.books).toHaveLength(0);
  });
});

describe("addBook", () => {
  it("should load all books when a book is added", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const model = new BooksModel();
    const controller = new BooksController(repository, model, userStore);
    vi.spyOn(apiGateway, "post").mockResolvedValue({});
    const loadAllSpy = vi.spyOn(controller, "loadAll");

    // act
    await controller.addBook({
      author: "Taras Shevchenko",
      name: "Kobzar",
    });

    // assert
    expect(loadAllSpy).toHaveBeenCalledOnce();
  });

  it("should not load all books when adding book is failed", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const model = new BooksModel();
    const controller = new BooksController(repository, model, userStore);
    vi.spyOn(apiGateway, "post").mockImplementation(() => {
      throw new Error("Some error");
    });
    const loadAllSpy = vi.spyOn(controller, "loadAll");

    // act
    await controller.addBook({
      author: "Taras Shevchenko",
      name: "Kobzar",
    });

    // assert
    expect(loadAllSpy).toHaveBeenCalledTimes(0);
  });
});

describe("addRandomBook", () => {
  it("should call addBook one time", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const model = new BooksModel();
    const controller = new BooksController(repository, model, userStore);
    vi.spyOn(apiGateway, "post").mockResolvedValue({});
    const addBookSpy = vi.spyOn(controller, "addBook");

    // act
    await controller.addRandomBook();

    // assert
    expect(addBookSpy).toHaveBeenCalledOnce();
  });
});

