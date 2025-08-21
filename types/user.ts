export type User = {
  email: string;
  password: string;
};

export interface RegisterUser {
  username: string;
  email: string;
}

export interface LoginUser {
  username: string;
  email: string;
  avatar: string;
}
