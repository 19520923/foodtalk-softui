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
import NotificationModel from './models/NotificationModel';

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
  }))
  .actions((self) => ({
    /* A function that is used to set the posts. */
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

    /* Load more the posts. */
    loadPosts: flow(function* () {
      try {
        const {rows} = yield API.getAllPosts(self.currentPage);
        self.rows.push(...rows);
        self.currentPage++;
      } catch (err) {
        console.log(err);
      }
    }),

    /* Setting the comments of a post. */
    setComment: flow(function* (post_id: string) {
      const index = _.findIndex(self.rows, (p) => p._id === post_id);
      try {
        const {rows, count} = yield API.getPostComments(1, post_id);
        self.rows[index].comments.setComment(rows, count);
      } catch (err) {
        console.log(err);
      }
    }),

    /* A function that takes in a post_data and then creates a post. */
    post: flow(function* (post_data: IPost) {
      try {
        const data = yield API.createPost(post_data);
        self.rows.unshift(data);
      } catch (error) {
        console.log(error);
      }
    }),

    /* A function that takes in a post_id, user_id, and isLiked. It then finds the index of the post_id in
the rows array. If isLiked is true, it removes the user_id from the reactions array. If isLiked is
false, it adds the user_id to the reactions array. It then calls the API.likePost function. */
    like: flow(function* (post_id: string, user_id: string, isLiked: boolean) {
      const index = _.findIndex(self.rows, (p) => p._id === post_id);

      if (isLiked) {
        self.rows[index].reactions.remove(user_id);
      } else {
        self.rows[index].reactions.push(user_id);
      }
      try {
        yield API.likePost(post_id);
      } catch (error) {
        console.log(error);
      }
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
  .actions((self) => ({
    setFoods: flow(function* (key?: string) {
      try {
        const {rows, count} = yield API.getAllFoods(1, key);
        self.rows = cast(rows);
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
        self.rows.push(...rows);
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

/* Creating a UserStore model with the following properties:
rows: an array of ProfileModel
count: a number
currentPage: a number */
const UserStore = types.model({
  rows: types.optional(types.array(ProfileModel), []),
  count: types.optional(types.number, 0),
  currentPage: types.optional(types.number, 1),
});

/* Creating a ProfileStore model with the following properties:
profile: a ProfileModel
foods: a FoodStore
posts: a PostStore */
const ProfileStore = types
  .model({
    profile: types.optional(ProfileModel, DEFAULT_STATE_PROFILE),
    foods: FoodStore,
    posts: PostStore,
    following: UserStore,
    follower: UserStore,
  })
  .actions((self) => ({
    /* Setting the profile to the profile that is passed in. */
    setProfile: (profile: TProfileModel) => {
      self.profile = profile;
    },

    /* Setting the user's posts. */
    setPosts: flow(function* (user_id: string) {
      try {
        const {rows, count} = yield API.getUserPosts(user_id);
        self.posts.rows = cast(rows);
        self.posts.count = count;
        self.posts.currentPage = 2;
      } catch (err) {
        console.log(err);
      }
    }),

    /* Loading the posts of a user. */
    loadPosts: flow(function* (user_id: string) {
      try {
        const {rows} = yield API.getUserPosts(user_id, self.posts.currentPage);
        self.posts.rows.push(...rows);
        self.posts.currentPage++;
      } catch (err) {
        console.log(err);
      }
    }),

    setFoods: flow(function* (user_id: string) {
      try {
        const {rows, count} = yield API.getUserFoods(user_id);
        self.foods.rows = cast(rows);
        self.foods.count = count;
        self.foods.currentPage = 2;
      } catch (err) {
        console.log(err);
      }
    }),

    loadFoods: flow(function* (user_id: string) {
      try {
        const {rows} = yield API.getUserFoods(user_id, self.foods.currentPage);
        self.foods.rows.push(...rows);
        self.foods.currentPage++;
      } catch (err) {
        console.log(err);
      }
    }),

    setFollowing: flow(function* (user_id: string) {
      try {
        const rows = yield API.getFollowing(user_id);
        self.following.rows = cast(rows);
        // self.following.count = count;
        // self.following.currentPage = 2;
      } catch (err) {
        console.log(err);
      }
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

    setFollower: flow(function* (user_id: string) {
      try {
        const rows = yield API.getFollower(user_id);
        self.follower.rows = cast(rows);
        // self.follower.count = count;
        // self.follower.currentPage = 2;
      } catch (err) {
        console.log(err);
      }
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
      try {
        const {rows, count} = yield API.getAllNotifications(1);
        self.rows = cast(rows);
        self.count = count;
        self.currentPage = 2;
      } catch (error) {
        console.log(error);
      }
    }),
    loadNoti: flow(function* () {
      try {
        const {rows} = yield API.getAllNotifications(self.currentPage);
        self.rows.push(...rows);
        self.currentPage++;
      } catch (error) {
        console.log(error);
      }
    }),
  }));

export const RootStore = types
  .model({
    user: ProfileStore,
    searchUsers: UserStore,
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
  }))
  .create({
    user: {
      profile: DEFAULT_STATE_PROFILE,
      posts: DEFAULT_LIST_STATE,
      foods: DEFAULT_LIST_STATE,
      follower: DEFAULT_LIST_STATE,
      following: DEFAULT_LIST_STATE,
    },
    searchUsers: DEFAULT_LIST_STATE,
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
