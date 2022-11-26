import {types, Instance, cast, flow} from 'mobx-state-tree';
import FoodModel from './FoodModel';
import {ProfileModel} from './ProfileModel';
import _ from 'lodash';
import API from '../../services/axiosClient';

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
  parent: types.maybeNull(types.string),
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
  })
  .actions((self) => ({
    setComments: flow(function* () {
      const {rows, count} = yield API.getPostComments(1, self._id);
      self.comments.rows = cast(rows);
      self.comments.count = count;
      self.comments.currentPage = 2;
    }),

    loadCommnets: flow(function* () {
      const {rows, count} = yield API.getPostComments(
        self.comments.currentPage,
        self._id,
      );
      self.comments.rows.push(rows);
      self.comments.currentPage++;
    }),

    addComment: (comment: TPostComment) => {
      self.comments.rows.push(comment);
      self.comments.count++;
    },
  }));

export default PostModel;
export type TPostModel = Instance<typeof PostModel>;
export type TPostComment = Instance<typeof CommentModel>;
