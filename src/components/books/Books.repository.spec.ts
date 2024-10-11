import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { BooksRepository } from "./Books.repository";
import { ApiGateway } from "../../shared/ApiGateway";
import { userStore } from "../../stores/user.store";
import { Book } from "./Books.type";

beforeAll(() => {
  global.fetch = vi.fn(() => {
    throw new Error("Network requests are not allowed during tests");
  });
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("getAll", () => {
  it("should call fetch one time with correct URL", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const getSpy = vi.spyOn(apiGateway, "get").mockImplementation(() => {
      // dont call fetch in tests
    });

    // act
    await repository.getAll();

    // assert
    expect(getSpy).toHaveBeenCalledOnce();
    expect(getSpy).toHaveBeenCalledWith("books/alexdem");
  });
});

describe("add", () => {
  it("should call fetch one time with correct URL and correct body", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    const postSpy = vi.spyOn(apiGateway, "post").mockImplementation(() => {
      // dont call fetch in tests
    });

    // act
    await repository.add({
      author: "Taras Shevchenko",
      name: "Kobzar",
    });

    // assert
    expect(postSpy).toHaveBeenCalledOnce();
    expect(postSpy).toHaveBeenCalledWith("books/alexdem", {
      author: "Taras Shevchenko",
      name: "Kobzar",
    });
  });

  it("should retun true when book is added", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    vi.spyOn(apiGateway, "post").mockResolvedValue({
      id: 1,
      author: "Taras Shevchenko",
      name: "Kobzar",
      ownerId: "alexdem",
    } as Book);

    // act
    const result = await repository.add({
      author: "Taras Shevchenko",
      name: "Kobzar",
    });

    // assert
    expect(result).toBeTruthy();
  });

  it("should retun false when adding book is failed", async () => {
    // arrange
    const apiGateway = new ApiGateway();
    const repository = new BooksRepository(apiGateway, userStore);
    vi.spyOn(apiGateway, "post").mockImplementation(() => {
      throw new Error("Some error");
    });

    // act
    const result = await repository.add({
      author: "Taras Shevchenko",
      name: "Kobzar",
    });

    // assert
    expect(result).toBeFalsy();
  });
});

