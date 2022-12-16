import React, {useState, useEffect, useCallback} from 'react';
import {Block, Image, Text} from '../components/atoms';
import {useTheme} from '../hooks';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {FontAwesome} from '@expo/vector-icons';
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
  const {colors, icons, sizes} = useTheme();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Reply me ! Please',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'BangDD',
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
          name: 'BangDD',
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

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    const sendStylesCustom = {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginRight: 15,
    };

    return (
      <Send {...props} containerStyle={sendStylesCustom}>
        <FontAwesome size={sizes.m} name={icons.edit} color={colors.blueText} />
      </Send>
    );
  };

  const _handleNavigateProfile = () => {
    alert('Go to this user profile');
  };

  return (
    <Block justify="space-between" paddingHorizontal={sizes.sm}>
      <GiftedChat
        alwaysShowSend
        onPressAvatar={_handleNavigateProfile}
        placeholder={'Write message ...'}
        renderSend={renderSend}
        alignTop={true}
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
