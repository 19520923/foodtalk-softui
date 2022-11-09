import {IFood} from './food';
import {INotification} from './notification';
import {IPost} from './post';
import {IUser} from './user';
export interface ILoginResponse {
  token: string;
  user: IUser;
}
export interface IListResponse {
  rows: Array<IPost>;
  count: number;
}
