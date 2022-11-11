import {Instance, types} from 'mobx-state-tree';

export const DEFAULT_STATE_PROFILE = {
  _id: '',
  name: '',
  username: '',
  email: '',
  cover_url: '',
  avatar_url: '',
  about: '',
  is_current: false,
};

const profile_obj = {
  _id: types.identifier,
  name: types.string,
  username: types.string,
  email: types.string,
  cover_url: types.string,
  avatar_url: types.string,
  about: types.string,
  is_current: types.optional(types.boolean, false),
};

const ProfileDetailModel = types.model({
  ...profile_obj,
});

export const ProfileModel = types.model({
  ...profile_obj,
  following: types.array(ProfileDetailModel),
  follower: types.array(ProfileDetailModel),
});

export const AuthorModel = types.model({
  ...profile_obj,
  following: types.array(types.string),
  follower: types.array(types.string),
});

export type TAuthorModel = Instance<typeof AuthorModel>;
export type TProfileModel = Instance<typeof ProfileModel>;
