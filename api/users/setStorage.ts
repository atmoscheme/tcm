//@ts-ignore
import nuxtStorage from "nuxt-storage";
import { STORAGE_NAME } from "~/layers/users/constants";
export const setStorageData = (value: any) => {
  nuxtStorage.localStorage.setData(
    STORAGE_NAME,
    JSON.stringify(value),
    100,
    "d",
  );
};
