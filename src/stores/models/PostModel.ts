import {types, Instance, cast, flow} from 'mobx-state-tree';
import FoodModel from './FoodModel';
import {ProfileModel} from './ProfileModel';
import API from '../../services/axiosClient';
import _ from 'lodash';

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
  comments: {
    rows: [],
    count: 0,
    currentPage: 1,
  },
};

const LocationModel = types.model({
  name: types.string,
  lat: types.string,
  lng: types.string,
});

const CommentModel = types.model({
  _id: types.identifier,
  author: ProfileModel,
  content: types.string,
  created_at: types.string,
});

const CommnetStore = types.model({
  rows: types.array(CommentModel),
  count: types.number,
  currentPage: types.number,
});

export const PostModel = types
  .model({
    _id: types.identifier,
    foods: types.array(FoodModel),
    content: types.string,
    photos: types.array(types.string),
    reactions: types.array(types.string),
    num_comment: types.number,
    author: ProfileModel,
    location: LocationModel,
    created_at: types.string,
    comments: types.optional(CommnetStore, {
      rows: [],
      count: 0,
      currentPage: 1,
    }),
    is_public: types.boolean,
    isOpenning: types.optional(types.boolean, false),
  })
  .views((self) => ({
    getIsLiked: (user_id: string) => {
      return _.findIndex(self.reactions, (e) => e === user_id) !== -1;
    },
  }))
  .actions((self) => ({
    setComments: flow(function* () {
      const {rows, count} = yield API.getPostComments(1, self._id);
      self.comments.rows = cast(rows);
      self.comments.count = count;
      self.comments.currentPage = 2;
    }),

    loadCommnets: flow(function* () {
      const {rows} = yield API.getPostComments(
        self.comments.currentPage,
        self._id,
      );
      self.comments.rows.push(rows);
      self.comments.currentPage++;
    }),

    addComment: (comment: TPostComment) => {
      self.comments.rows.unshift(comment);
      self.comments.count++;
      self.num_comment++;
    },

    /* A function that takes in a post_id, user_id, and isLiked. It then finds the index of the post_id in
the rows array. If isLiked is true, it removes the user_id from the reactions array. If isLiked is
false, it adds the user_id to the reactions array. It then calls the API.likePost function. */
    like: (user_id: string) => {
      if (self.getIsLiked(user_id)) {
        self.reactions.remove(user_id);
      } else {
        self.reactions.push(user_id);
      }
    },

    toggleOpen: (status: boolean) => {
      self.isOpenning = status;
    },
  }));

export default PostModel;
export type TPostModel = Instance<typeof PostModel>;
export type TPostComment = Instance<typeof CommentModel>;
