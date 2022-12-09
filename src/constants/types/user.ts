export interface IUser {
  _id: string;
  name?: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  cover_url?: string;
  about?: string;
  is_current?: boolean;
  follower?: Array<any>;
  following?: Array<any>;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface IRegistration {
  username: string;
  name: string;
  email: string;
  password: string;
}
