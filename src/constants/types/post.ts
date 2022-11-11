import {IFood} from './food';
import {IUser} from './user';
export interface ILocation {
  name: string;
  lat: string;
  lng: string;
}

export interface IComment {
  _id?: string;
  content?: string;
  author?: IUser;
  created_at?: string;
  parent?: string;
}

export interface IPost {
  _id?: string;
  foods?: Array<IFood>;
  author?: IUser | string;
  content?: string;
  photos?: Array<any>;
  created_at?: string;
  num_comment?: number;
  reactions?: Array<any>;
  location?: ILocation;
  is_public?: boolean;
  comments?: {
    rows?: Array<IComment>;
    count?: number;
    currentPage?: number;
  };
}
