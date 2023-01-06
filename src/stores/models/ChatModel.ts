import {cast, flow, Instance, types} from 'mobx-state-tree';
import MessageModel, {TMessageModel} from './MessageModel';
import {ProfileModel} from './ProfileModel';
import API from '../../services/axiosClient';

const MessageStore = types.model({
  rows: types.optional(types.array(MessageModel), []),
  count: types.optional(types.number, 0),
  currentPage: types.optional(types.number, 0),
});

const ChatModel = types
  .model({
    _id: types.string,
    user_1: ProfileModel,
    user_2: ProfileModel,
    is_seen: types.boolean,
    lastMessage: types.maybeNull(MessageModel),
    created_at: types.string,
    updated_at: types.string,
    messages: types.optional(MessageStore, {
      rows: [],
      count: 0,
      currentPage: 1,
    }),
  })
  .actions((self) => ({
    setMessage: flow(function* () {
      const {rows, count} = yield API.getMessage(self._id, 1);
      self.messages.rows = cast(rows);
      self.messages.count = count;
      self.messages.currentPage = 2;
    }),

    loadMessage: flow(function* () {
      const {rows} = yield API.getMessage(self._id, self.messages.currentPage);
      self.messages.rows.push(rows);
      self.messages.currentPage++;
    }),

    addMessage: (message: TMessageModel) => {
      self.messages.rows.unshift(message);
      self.messages.count++;
    },
  }));

export default ChatModel;
export type TChatModel = Instance<typeof ChatModel>;
