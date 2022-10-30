import {Instance, types} from 'mobx-state-tree';
import ProfileModel from './ProfileModel';

const FoodRateModel = types.model({
  _id: types.optional(types.string, ''),
  author: types.maybe(ProfileModel),
  content: types.optional(types.string, ''),
  score: types.optional(types.number, 0),
  created_at: types.optional(types.string, ''),
});

const FoodModel = types.model({
  _id: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  ingredients: types.optional(types.array(types.string), []),
  recipe: types.optional(types.array(types.string), []),
  score: types.optional(types.number, 0),
  author: types.maybe(ProfileModel),
  photo: types.optional(types.string, ''),
  num_rate: types.optional(types.integer, 0),
  created_at: types.optional(types.string, ''),
  rates: types.optional(types.array(FoodRateModel), []),
});

export default FoodModel;
export type TFoodModel = Instance<typeof FoodModel>;
