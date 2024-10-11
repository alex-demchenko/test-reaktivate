import { describe, expect, it } from "vitest";
import { HeaderModel } from "./Header.model";
import { BooksModel } from "../books/Books.model";
import { faker } from "@faker-js/faker";
import { userStore } from "../../stores/user.store";

describe("userBooks", () => {
  it("should calculate books from the BooksModel", async () => {
    // arrange
    const booksModel = new BooksModel();
    booksModel.books = [
      {
        id: faker.number.int(),
        name: faker.lorem.words({ min: 1, max: 5 }),
        author: faker.person.fullName(),
        ownerId: userStore.userId,
      },
      {
        id: faker.number.int(),
        name: faker.lorem.words({ min: 1, max: 5 }),
        author: faker.person.fullName(),
        ownerId: userStore.userId,
      },
      {
        id: faker.number.int(),
        name: faker.lorem.words({ min: 1, max: 5 }),
        author: faker.person.fullName(),
        ownerId: faker.string.alpha(10), // another user
      },
    ];
    const model = new HeaderModel(booksModel, userStore);

    // act & asser
    expect(model.userBooks).toBe(2);
  });
});

