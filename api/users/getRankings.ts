import { setStorageData } from "./setStorage";
import type { Users } from "~/types/users";
import type { User } from "~/types/users";

import { STORAGE_NAME } from "~/layers/users/constants";
import { getStorageData } from "./getStorage";
//@ts-ignore
export const getRankings = (users: Users): Users => {
  const data = getStorageData();

  if (!data && users) {
    prepareUsersStorage(users);
    return users;
  } else if (data && users) {
    const result = users.map((user: User) => ({ ...user, ...data[user.id] }));
    return result;
  }
};

const prepareUsersStorage = (users: Users) => {
  const result = {};
  users.forEach((user: User) => {
    if (typeof user.id === "number") {
      //@ts-ignore
      result[user.id] = {
        rank: 0,
        description: "",
      };
    }
  });
  setStorageData(result);
};
