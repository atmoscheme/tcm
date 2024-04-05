import { getStorageData } from "./getStorage";
import type { User } from "~/types/users";
import { setStorageData } from "./setStorage";
export const setUserInfo = (userData: User) => {
  const data = getStorageData();
  if (
    userData.description &&
    userData.description !== data[userData.id].description
  ) {
    data[userData.id].description = userData.description;
    setStorageData(data);
  }
  if (
    (userData.rank || userData.rank === 0) &&
    userData.rank !== data[userData.id].rank
  ) {
    data[userData.id].rank = userData.rank;
    setStorageData(data);
  }
};
