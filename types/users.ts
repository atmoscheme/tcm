interface Support {
  url: string;
  text: string;
}
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
export type Users = User[];

export interface GetUsersQueryResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Users;
  support: Support;
}
