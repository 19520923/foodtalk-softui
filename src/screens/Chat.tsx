import React, {useState, useEffect} from 'react';
import {Block, Text} from '../components/atoms';
import {useTheme} from '../hooks';
import {GiftedChat} from 'react-native-gifted-chat';

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}

const Chat = () => {
  const {colors} = useTheme();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://thuvienanime.com/wp-content/uploads/2022/04/Naruto.jpg',
        },
      },
      {
        _id: 2,
        text: 'Do you like to eat hamburger ?',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://thuvienanime.com/wp-content/uploads/2022/04/Naruto.jpg',
        },
        image:
          'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1',
        // Mark the message as sent, using one tick
        sent: true,
        // Mark the message as received, using two tick
        received: true,
        // Mark the message as pending with a clock loader
        pending: true,
      },
    ]);
  }, []);

  const onSend = (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  return (
    <Block justify="space-between">
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </Block>
  );
};

export default Chat;
