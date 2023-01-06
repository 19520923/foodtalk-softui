import {IMessage} from 'react-native-gifted-chat';
import {TMessageModel} from '../stores/models/MessageModel';

const mappingMessageChat = (message: TMessageModel): IMessage => {
  return {
    _id: message._id,
    text: message.content,
    createdAt: new Date(message.created_at),
    user: {
      _id: message.author._id,
      avatar: message.author.avatar_url,
      name: message.author.name,
    },
  };
};

export {mappingMessageChat};
