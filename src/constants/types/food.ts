import {IUser} from './user';

export interface IRate {
    
}

export interface IFood {
  _id: string;
  name: string;
  ingredients: Array<string>;
  recipe: Array<string>;
  score: number;
  author: IUser;
  photo: string;
  num_rate: number;
  created_a: string;
  is_public: boolean;
  about: string;
  rates: Array<IRate>;
}
