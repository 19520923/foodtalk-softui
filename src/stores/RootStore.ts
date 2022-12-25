import {cast, flow, Instance, types} from 'mobx-state-tree';
import FoodModel, {TFoodModel} from './models/FoodModel';
import PostModel from './models/PostModel';
import {
  ProfileModel,
  DEFAULT_STATE_PROFILE,
  TProfileModel,
} from './models/ProfileModel';
import _ from 'lodash';
import {persist} from './mobx-persist';
import API from '../services/axiosClient';
import {IPost} from '../constants/types';
import NotificationModel, {
  TNotificationModel,
} from './models/NotificationModel';

const DEFAULT_LIST_STATE = {
  rows: [],
  count: 0,
  currentPage: 1,
};

/* Creating a PostStore model with the following properties:
rows: an array of PostModel
count: a number
currentPage: a number */
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
    getPostById(post_id: string) {
      const index = _.findIndex(self.rows, (e) => e._id === post_id);
      if (index === -1) {
        return null;
      }
      return self.rows[index];
    },
  }))
  .actions((self) => ({
    /* A function that is used to set the posts. */
    setPosts: flow(function* () {
      const {rows, count} = yield API.getAllPosts(1);
      self.rows = cast(_.unionBy(self.rows, rows, '_id'));
      self.count = count;
      self.currentPage = 2;
    }),

    /* Load more the posts. */
    loadPosts: flow(function* () {
      const {rows} = yield API.getAllPosts(self.currentPage);
      self.rows.push(...rows);
      self.currentPage++;
    }),

    /* A function that takes in a post_data and then creates a post. */
    post: flow(function* (post_data: IPost) {
      const data = yield API.createPost(post_data);
      self.rows.unshift(data);
    }),
  }));

/* Creating a FoodStore model with the following properties:
rows: an array of FoodModel
count: a number
currentPage: a number */
const FoodStore = types
  .model({
    rows: types.optional(types.array(FoodModel), []),
    count: types.optional(types.number, 0),
    currentPage: types.optional(types.integer, 1),
  })
  .views((self) => ({
    getFoodById(food_id: string) {
      const index = _.findIndex(self.rows, (e) => e._id === food_id);
      return self.rows[index];
    },
  }))
  .actions((self) => ({
    setFoods: flow(function* (key?: string) {
      const {rows, count} = yield API.getAllFoods(1, key);
      self.rows = cast(rows);
      self.count = count;
      self.currentPage = 2;
    }),
    /* A function that takes in a payload and then sets the rows to the payload.foods and the count to the
payload.count. */
    loadFoods: flow(function* (key: string) {
      const {rows} = yield API.getAllFoods(self.currentPage, key);
      self.rows.push(...rows);
      self.currentPage++;
    }),

    /* Adding a food to the top of the list. */
    addFood: (food: TFoodModel) => {
      self.rows.unshift(food);
    },
  }));

/* Creating a ProfileStore model with the following properties:
profile: a ProfileModel
foods: a FoodStore
posts: a PostStore */
const ProfileStore = types
  .model({
    profile: ProfileModel,
    foods: types.optional(FoodStore, DEFAULT_LIST_STATE),
    posts: types.optional(PostStore, DEFAULT_LIST_STATE),
    following: types.optional(types.array(ProfileModel), []),
    follower: types.optional(types.array(ProfileModel), []),
  })
  .actions((self) => ({
    /* Setting the profile to the profile that is passed in. */
    setProfile: (profile: TProfileModel) => {
      self.profile = profile;
    },

    /* Setting the user's posts. */
    setPosts: flow(function* () {
      const {rows, count} = yield API.getUserPosts(self.profile._id);
      self.posts.rows = cast(rows);
      self.posts.count = count;
      self.posts.currentPage = 2;
    }),

    /* Loading the posts of a user. */
    loadPosts: flow(function* () {
      const {rows} = yield API.getUserPosts(
        self.profile._id,
        self.posts.currentPage,
      );
      self.posts.rows.push(...rows);
      self.posts.currentPage++;
    }),

    setFoods: flow(function* () {
      const {rows, count} = yield API.getUserFoods(self.profile._id);
      self.foods.rows = cast(rows);
      self.foods.count = count;
      self.foods.currentPage = 2;
    }),

    loadFoods: flow(function* () {
      const {rows} = yield API.getUserFoods(
        self.profile._id,
        self.foods.currentPage,
      );
      self.foods.rows.push(...rows);
      self.foods.currentPage++;
    }),

    setFollowing: flow(function* () {
      const rows = yield API.getFollowing(self.profile._id);
      self.following = cast(rows);
      // self.following.count = count;
      // self.following.currentPage = 2;
    }),

    // loadFollowing: flow(function* (user_id: string) {
    //   try {
    //     const {rows} = yield API.getFollowing(
    //       user_id,
    //       self.following.currentPage,
    //     );
    //     self.following.rows.push(...rows);
    //     self.following.currentPage++;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }),

    setFollower: flow(function* () {
      const rows = yield API.getFollower(self.profile._id);
      self.follower = cast(rows);
      // self.follower.count = count;
      // self.follower.currentPage = 2;
    }),

    // loadFollower: flow(function* (user_id: string) {
    //   try {
    //     const {rows} = yield API.getFollower(
    //       user_id,
    //       self.follower.currentPage,
    //     );
    //     self.follower.rows.push(...rows);
    //     self.follower.currentPage++;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }),
  }));

/* Creating a UserStore model with the following properties:
rows: an array of ProfileModel
count: a number
currentPage: a number */
const UserStore = types
  .model({
    rows: types.optional(types.array(ProfileStore), []),
    count: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
  })
  .views((self) => ({
    getById: (id: string) => {
      const index = _.findIndex(self.rows, (e) => e.profile._id === id);
      return self.rows[index];
    },
  }))
  .actions((self) => ({
    setUsers: flow(function* (key?: string) {
      const {rows, count} = yield API.getAllUsers(1, key);
      self.rows = cast(
        rows.map((row: TProfileModel) => ({
          profile: row,
        })),
      );
      self.count = count;
      self.currentPage = 2;
    }),
    /* A function that takes in a payload and then sets the rows to the payload.foods and the count to the
payload.count. */
    loadUsers: flow(function* (key: string) {
      const {rows} = yield API.getAllUsers(self.currentPage, key);
      self.rows.push(...rows.map((row: TProfileModel) => ({profile: row})));
      self.currentPage++;
    }),
  }));

/* Creating a NotificationStore model with the following properties:
rows: an array of NotificationModel
count: a number
currentPage: a number */
const NotificationStore = types
  .model({
    rows: types.optional(types.array(NotificationModel), []),
    count: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
  })
  .actions((self) => ({
    /* Setting the notifications. */
    setNoti: flow(function* () {
      const {rows, count} = yield API.getAllNotifications(1);
      self.rows = cast(rows);
      self.count = count;
      self.currentPage = 2;
    }),
    loadNoti: flow(function* () {
      const {rows} = yield API.getAllNotifications(self.currentPage);
      self.rows.push(...rows);
      self.currentPage++;
    }),

    addNoti: (noti: TNotificationModel) => {
      self.rows.unshift(noti);
      self.count++;
    },
  }));

export const RootStore = types
  .model({
    user: ProfileStore,
    searchUsers: UserStore,
    recentUsers: UserStore,
    searchFoods: FoodStore,
    posts: PostStore,
    notifications: NotificationStore,
    isLoggedIn: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    /* Setting the isLoggedIn to the isLoggedIn that is passed in. */
    setIsLoggedIn: (isLoggedIn: boolean) => {
      self.isLoggedIn = isLoggedIn;
    },
    logout: () => {
      self.user = cast({
        profile: DEFAULT_STATE_PROFILE,
        foods: DEFAULT_LIST_STATE,
        posts: DEFAULT_LIST_STATE,
        following: [],
        follower: [],
      });
      self.searchUsers = cast(DEFAULT_LIST_STATE);
      self.recentUsers = cast(DEFAULT_LIST_STATE);
      self.searchFoods = cast(DEFAULT_LIST_STATE);
      self.posts = cast(DEFAULT_LIST_STATE);
      self.notifications = cast(DEFAULT_LIST_STATE);
      self.isLoggedIn = false;
    },
  }))
  .create({
    user: {
      profile: DEFAULT_STATE_PROFILE,
      foods: DEFAULT_LIST_STATE,
      posts: DEFAULT_LIST_STATE,
      following: [],
      follower: [],
    },
    searchUsers: DEFAULT_LIST_STATE,
    recentUsers: DEFAULT_LIST_STATE,
    searchFoods: DEFAULT_LIST_STATE,
    posts: DEFAULT_LIST_STATE,
    notifications: DEFAULT_LIST_STATE,
    isLoggedIn: false,
  });

/* Persisting the root store. */
persist(
  '@rootStore',
  RootStore,
  {
    jsonify: true,
  },
  {
    fetching: true,
  },
);

export type TRootStore = Instance<typeof RootStore>;
export type TProfileStore = Instance<typeof ProfileStore>;
