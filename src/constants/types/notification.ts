import {IFood} from './food';
import {IPost} from './post';
import {IUser} from './user';

export interface INotification {
  _id: string;
  content: string;
  post_data?: IPost;
  food_data?: IFood;
  is_seen: boolean;
  created_at: number | Date | string;
  type: 'SYSTEM' | 'POST' | 'FOOD' | 'USER';
  author: IUser;
}
