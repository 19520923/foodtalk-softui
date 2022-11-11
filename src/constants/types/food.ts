import {IUser} from './user';

export interface IRate {
  _id?: string;
  author?: IUser;
  content?: string;
  score?: number;
  created_at?: string;
}

export interface IFood {
  _id?: string;
  name?: string;
  ingredients?: Array<string>;
  recipe?: Array<string>;
  score?: number;
  author?: IUser;
  photo?: string;
  num_rate?: number;
  created_at?: string;
  is_public?: boolean;
  about?: string;
  rates?: {
    rows?: Array<IRate>;
    count?: number;
    currentPage?: number;
  };
}
