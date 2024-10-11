import { makeAutoObservable } from "mobx";

export class UserStore {
  userId = "alexdem";

  constructor() {
    makeAutoObservable(this);
  }
}

export const userStore = new UserStore();
