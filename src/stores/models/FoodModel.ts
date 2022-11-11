import {Instance, types} from 'mobx-state-tree';
import {AuthorModel} from './ProfileModel';

export const DEFAULT_STATE_FOOD = {
  _id: '',
  name: '',
  ingredients: [],
  recipe: [],
  score: 0,
  author: {},
  photo: '',
  num_rate: 0,
  created_at: '',
  rates: [],
};

const FoodRateModel = types.model({
  _id: types.identifier,
  author: AuthorModel,
  content: types.string,
  score: types.number,
  created_at: types.string,
});

const RateStore = types.model({
  rows: types.optional(types.array(FoodRateModel), []),
  count: types.integer,
  currentPage: types.integer,
});

const FoodModel = types.model({
  _id: types.identifier,
  name: types.string,
  ingredients: types.array(types.string),
  recipe: types.array(types.string),
  score: types.number,
  author: AuthorModel,
  photo: types.string,
  num_rate: types.number,
  created_at: types.string,
  rates: types.optional(RateStore, {
    rows: [],
    count: 0,
    currentPage: 1,
  }),
});

export default FoodModel;

export type TFoodModel = Instance<typeof FoodModel>;
export type TFoodRateModel = Instance<typeof FoodRateModel>;
