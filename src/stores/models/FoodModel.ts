import {cast, flow, Instance, types} from 'mobx-state-tree';
import {ProfileModel} from './ProfileModel';
import API from '../../services/axiosClient';

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
  about: '',
};

const FoodRateModel = types.model({
  _id: types.identifier,
  author: ProfileModel,
  content: types.string,
  score: types.number,
  created_at: types.string,
});

const RateStore = types.model({
  rows: types.optional(types.array(FoodRateModel), []),
  count: types.integer,
  currentPage: types.integer,
});

const FoodModel = types
  .model({
    _id: types.identifier,
    name: types.string,
    ingredients: types.array(types.string),
    recipe: types.array(types.string),
    score: types.number,
    author: ProfileModel,
    about: types.string,
    photo: types.string,
    num_rate: types.number,
    created_at: types.string,
    rates: types.optional(RateStore, {
      rows: [],
      count: 0,
      currentPage: 1,
    }),
    isOpenning: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setRates: flow(function* () {
      const {rows, count} = yield API.getFoodRates(1, self._id);
      self.rates.rows = cast(rows);
      self.rates.count = count;
      self.rates.currentPage = 2;
    }),
    loadRates: flow(function* () {
      const {rows} = yield API.getFoodRates(self.rates.currentPage, self._id);
      self.rates.rows = cast(rows);
      self.rates.currentPage++;
    }),
    addRate: (rate: TFoodRateModel) => {
      self.rates.rows.unshift(rate);
      self.rates.count++;
      self.score += rate.score;
      self.num_rate++;
    },
    toggleOpenning: (status: boolean) => {
      self.isOpenning = status;
    },
  }));

export default FoodModel;

export type TFoodModel = Instance<typeof FoodModel>;
export type TFoodRateModel = Instance<typeof FoodRateModel>;
