//@ts-ignore
import nuxtStorage from "nuxt-storage";
import { STORAGE_NAME } from "~/layers/users/constants";

export const getStorageData = () =>
  JSON.parse(nuxtStorage.localStorage.getData(STORAGE_NAME));
