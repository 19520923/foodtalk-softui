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
  _id: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  email: types.optional(types.string, ''),
  cover_url: types.optional(types.string, ''),
  avatar_url: types.optional(types.string, ''),
  about: types.optional(types.string, ''),
  is_current: types.optional(types.boolean, false),
};

const ProfileDetailModel = types.model({
  ...profile_obj,
});

const ProfileModel = types.model({
  ...profile_obj,
  following: types.optional(types.array(ProfileDetailModel), []),
  follower: types.optional(types.array(ProfileDetailModel), []),
}).actions(self => ({
  follow: (user: Instance<typeof ProfileDetailModel>) => {
    self.following.push(user)
  },
  
}));

export default ProfileModel;
export type TProfileModel = Instance<typeof ProfileModel>;
