import {cast, flow, Instance, types} from 'mobx-state-tree';
import FoodModel, {TFoodModel} from './models/FoodModel';
import PostModel, {TPostModel} from './models/PostModel';
import {
  ProfileModel,
  DEFAULT_STATE_PROFILE,
  TProfileModel,
} from './models/ProfileModel';
import _ from 'lodash';
import {persist} from './mobx-persist';
import API from '../services/axiosClient';

const PostStore = types
  .model({
    rows: types.optional(types.array(PostModel), []),
    count: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
  })
  .views((self) => ({
    getCommentsById(post_id: string) {
      const index = _.findIndex(self.rows, (e) => e._id === post_id);
      return self.rows[index].comments.rows;
    },
  }))
  .actions((self) => ({
    setPosts: flow(function* () {
      try {
        const {rows, count} = yield API.getAllPosts(1);
        self.rows = cast(_.unionBy(self.rows, rows, '_id'));
        self.count = count;
        self.currentPage = 2;
      } catch (err) {
        console.log(err);
      }
    }),

    loadPosts: flow(function* () {
      try {
        const {rows} = yield API.getAllPosts(self.currentPage);
        self.rows.push(rows);
        self.currentPage++;
      } catch (err) {
        console.log(err);
      }
    }),

    setComment: flow(function* (post_id: string) {
      const index = _.findIndex(self.rows, (p) => p._id === post_id);
      try {
        const {rows, count} = yield API.getPostComments(1, post_id);
        self.rows[index].comments.setComment(rows, count);
      } catch (err) {
        console.log(err);
      }
    }),
  }));

const FoodStore = types
  .model({
    rows: types.optional(types.array(FoodModel), []),
    count: types.optional(types.number, 0),
    currentPage: types.optional(types.integer, 1),
  })
  .actions((self) => ({
    setFoods: flow(function* (key?: string) {
      try {
        const {rows, count} = yield API.getAllFoods(1, key);
        self.rows = cast(_.unionBy(rows, self.rows, '_id'));
        self.count = count;
        self.currentPage = 2;
      } catch (err) {
        console.log(err);
      }
    }),
    /* A function that takes in a payload and then sets the rows to the payload.foods and the count to the
payload.count. */
    loadFoods: flow(function* (key: string) {
      try {
        const {rows} = yield API.getAllFoods(self.currentPage, key);
        self.rows.push(rows);
        self.currentPage++;
      } catch (err) {
        console.log(err);
      }
    }),

    /* Adding a food to the top of the list. */
    addFood: (food: TFoodModel) => {
      self.rows.unshift(food);
    },
  }));

const UserStore = types
  .model({
    profile: ProfileModel,
    foods: types.maybe(FoodStore),
    posts: types.maybe(PostStore),
  })
  .actions((self) => ({
    /* Setting the profile to the profile that is passed in. */
    setProfile: (profile: TProfileModel) => {
      self.profile = profile;
    },
  }));

export const RootStore = types
  .model({
    user: types.maybe(UserStore),
    searchUsers: types.optional(types.array(ProfileModel), []),
    searchFoods: types.optional(types.array(FoodStore), []),
    posts: types.maybe(PostStore),
    isLoggedIn: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    /* Setting the isLoggedIn to the isLoggedIn that is passed in. */
    setIsLoggedIn: (isLoggedIn: boolean) => {
      self.isLoggedIn = isLoggedIn;
    },
  }))
  .create({
    user: {
      profile: DEFAULT_STATE_PROFILE,
      foods: {
        rows: [],
        count: 0,
        currentPage: 1,
      },
      posts: {
        rows: [],
        count: 0,
        currentPage: 1,
      },
    },
    searchUsers: [],
    searchFoods: [],
    posts: {
      rows: [],
      count: 0,
      currentPage: 1,
    },
  });

// Persisting the root store. */
// persist(
//   '@rootStore',
//   RootStore,
//   {
//     jsonify: true,
//   },
//   {
//     fetching: true,
//   },
// );

export type TRootStore = Instance<typeof RootStore>;
