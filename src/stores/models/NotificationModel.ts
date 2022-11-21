import {types} from 'mobx-state-tree';
import FoodModel from './FoodModel';
import PostModel from './PostModel';
import {ProfileModel} from './ProfileModel';

const NotificationModel = types.model({
  _id: types.identifier,
  content: types.string,
  post_data: types.maybe(PostModel),
  food_data: types.maybe(FoodModel),
  is_seen: types.boolean,
  created_at: types.string,
  type: types.enumeration('type', ['SYSTEM', 'POST', 'FOOD', 'USER']),
  author: ProfileModel,
});

export default NotificationModel;
