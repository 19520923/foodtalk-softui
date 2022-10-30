import {Instance, types} from 'mobx-state-tree';
import FoodModel, {TFoodModel} from './models/FoodModel';
import PostModel, {TPostModel} from './models/PostModel';
import ProfileModel, {
  DEFAULT_STATE_PROFILE,
  TProfileModel,
} from './models/ProfileModel';
import {persist} from './mobx-persist';

const FoodStore = types
  .model({
    rows: types.optional(types.array(FoodModel), []),
    count: types.optional(types.integer, 0),
    currentPage: types.optional(types.integer, 1),
  })
  .actions((self) => ({
    /* A function that takes in a payload and then sets the rows to the payload.foods and the count to the
payload.count. */
    loadFoods: (payload: {foods: Array<TFoodModel>; count: number}) => {
      self.rows.push(...payload.foods);
      self.count = payload.count;
      self.currentPage++;
    },
    /* Adding a food to the top of the list. */
    addFood: (food: TFoodModel) => {
      self.rows.unshift(food);
    },
  }));

const PostStore = types
  .model({
    rows: types.optional(types.array(PostModel), []),
    count: types.optional(types.integer, 0),
    currentPage: types.optional(types.integer, 1),
  })
  .actions((self) => ({
    /* Taking in a payload and then setting the rows to the payload.posts and the count to the
payload.count. */
    loadPosts: (payload: {posts: Array<TPostModel>; count: number}) => {
      self.rows.push(...payload.posts);
      self.count = payload.count;
      self.currentPage++;
    },
    /* Adding a post to the top of the list. */
    addPost: (post: TPostModel) => {
      self.rows.unshift(post);
    },
  }));

const UserStore = types
  .model({
    profile: types.maybe(ProfileModel),
    foods: types.maybe(FoodStore),
    posts: types.maybe(PostStore),
  })
  .actions((self) => ({
    /* Setting the profile to the profile that is passed in. */
    setProfile: (profile: TProfileModel) => {
      self.profile = profile;
    },
  }));

const RootStore = types
  .model({
    user: types.maybe(UserStore),
    searchUsers: types.optional(types.array(ProfileModel), []),
    searchFoods: types.optional(types.array(FoodModel), []),
    posts: types.maybe(PostStore),
    selectedUser: types.maybeNull(UserStore),
    selectedPost: types.maybeNull(PostModel),
    selectedFood: types.maybeNull(FoodModel),
    isLoggedIn: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    /* Setting the isLoggedIn to the isLoggedIn that is passed in. */
    setIsLoggedIn: (isLoggedIn: boolean) => {
      self.isLoggedIn = isLoggedIn;
    },
    /* Setting the selectedUser to the user that is passed in. */
    setSelectedUser: (user: Instance<typeof UserStore>) => {
      self.selectedUser = user;
    },
    /* Setting the selectedPost to the post that is passed in. */
    setSelectedPost: (post: TPostModel) => {
      self.selectedPost = post;
    },
    /* Setting the selectedFood to the food that is passed in. */
    setSelectedFood: (food: TFoodModel) => {
      self.selectedFood = food;
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
    selectedUser: null,
    selectedFood: null,
    selectedPost: null,
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

export default RootStore;
export type TRootStore = Instance<typeof RootStore>;
