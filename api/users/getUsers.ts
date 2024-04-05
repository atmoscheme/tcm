import client from "../client";
import getApiKeyAndPath from "../apiPaths";
import type { GetUsersQueryResponse } from "~/types/users";

/**
 * @description Получение пользователей.
 * @summary getUsers */

export function getUsers(options = {}) {
  return client<GetUsersQueryResponse>(getApiKeyAndPath("users"), {
    method: "get",
    ...options,
  });
}
