import {types, Instance} from 'mobx-state-tree';
import FoodModel from './FoodModel';
import ProfileModel from './ProfileModel';

const LocationModel = types.model({
  name: types.optional(types.string, ''),
  lat: types.optional(types.string, ''),
  lng: types.optional(types.string, ''),
});

const CommentModel = types.model({
  _id: types.optional(types.string, ''),
  author: types.maybe(ProfileModel),
  content: types.optional(types.string, ''),
  parent: types.maybeNull(types.string),
  created_at: types.optional(types.string, ''),
});

const PostModel = types.model({
  _id: types.optional(types.string, ''),
  foods: types.optional(types.array(FoodModel), []),
  content: types.optional(types.string, ''),
  photos: types.optional(types.array(types.string), []),
  reactions: types.optional(types.array(types.string), []),
  num_comment: types.optional(types.integer, 0),
  author: types.maybe(ProfileModel),
  location: types.maybeNull(types.maybe(LocationModel)),
  created_at: types.optional(types.string, ''),
  comments: types.optional(types.array(CommentModel), []),
});

export default PostModel;
export type TPostModel = Instance<typeof PostModel>;
