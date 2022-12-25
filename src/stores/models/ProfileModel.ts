import {flow, Instance, types} from 'mobx-state-tree';
import API from '../../services/axiosClient';

export const DEFAULT_STATE_PROFILE = {
  _id: '',
  name: '',
  username: '',
  email: '',
  cover_url: '',
  avatar_url: '',
  about: '',
  is_current: false,
  follower: [],
  following: [],
};

export const ProfileModel = types
  .model({
    _id: types.identifier,
    name: types.string,
    username: types.string,
    email: types.string,
    cover_url: types.string,
    avatar_url: types.string,
    about: types.string,
    is_current: types.optional(types.boolean, false),
    following: types.array(types.string),
    follower: types.array(types.string),
  })
  .actions((self) => ({
    follow: flow(function* (user_id: string) {
      self.following.push(user_id);
      yield API.follow(user_id);
    }),
    unfollow: flow(function* (user_id: string) {
      yield API.unfollow(user_id);
    }),
  }));

export type TProfileModel = Instance<typeof ProfileModel>;
