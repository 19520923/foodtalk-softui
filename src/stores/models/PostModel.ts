import {types, Instance} from 'mobx-state-tree';
import FoodModel from './FoodModel';
import {AuthorModel} from './ProfileModel';

export const DEFAULT_STATE_POST = {
  _id: '',
  foods: [],
  content: '',
  photos: [],
  reactions: [],
  num_comment: 0,
  author: {},
  location: null,
  created_at: '',
  comments: [],
};

const LocationModel = types.model({
  name: types.string,
  lat: types.string,
  lng: types.string,
});

const CommentModel = types.model({
  _id: types.string,
  author: AuthorModel,
  content: types.string,
  parent: types.maybeNull(types.string),
  created_at: types.string,
});

const CommnetStore = types
  .model({
    rows: types.array(CommentModel),
    count: types.number,
    currentPage: types.number,
  })

const PostModel = types.model({
  _id: types.string,
  foods: types.array(FoodModel),
  content: types.string,
  photos: types.array(types.string),
  reactions: types.array(types.string),
  num_comment: types.number,
  author: AuthorModel,
  location: LocationModel,
  created_at: types.string,
  comments: CommnetStore,
  is_public: types.boolean,
});

export default PostModel;
export type TPostModel = Instance<typeof PostModel>;
export type TPostComment = Instance<typeof CommentModel>;
