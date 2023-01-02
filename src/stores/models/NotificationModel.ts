import {types, Instance, flow} from 'mobx-state-tree';
import FoodModel from './FoodModel';
import PostModel from './PostModel';
import {ProfileModel} from './ProfileModel';
import API from '../../services/axiosClient';

const NotificationModel = types
  .model({
    _id: types.identifier,
    content: types.string,
    post_data: types.maybeNull(PostModel),
    food_data: types.maybeNull(FoodModel),
    is_seen: types.boolean,
    created_at: types.string,
    type: types.enumeration('type', ['SYSTEM', 'POST', 'FOOD', 'USER']),
    author: ProfileModel,
  })
  .actions((self) => ({
    seen: flow(function* () {
      self.is_seen = true;
      yield API.seenNoti(self._id);
    }),
  }));

export default NotificationModel;
export type TNotificationModel = Instance<typeof NotificationModel>;
