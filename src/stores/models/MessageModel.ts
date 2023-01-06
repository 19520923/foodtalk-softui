import {types, Instance} from 'mobx-state-tree';
import {ProfileModel} from './ProfileModel';

const MessageModel = types.model({
  _id: types.string,
  author: ProfileModel,
  content: types.string,
  chat: types.string,
  // type: types.enumeration(['TEXT', 'PICTURE', 'HTML']),
  created_at: types.string,
});

export default MessageModel;
export type TMessageModel = Instance<typeof MessageModel>;
