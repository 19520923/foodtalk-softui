import React, {useState, useEffect} from 'react';
import {Block} from '../components/atoms';
import {useMst, useTheme} from '../hooks';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {FontAwesome} from '@expo/vector-icons';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IParamList} from '../constants/types';
import {mappingMessageChat} from '../services/mapping';
import {observer} from 'mobx-react-lite';
import API from '../services/axiosClient';

const Chat = () => {
  const {colors, icons, sizes} = useTheme();

  const route = useRoute<RouteProp<IParamList, 'Chat'>>();
  const {chat} = route.params;

  const [data, setData] = useState({
    chat: route.params.chat._id,
    content: '',
  });

  const {
    user: {
      profile: {_id},
    },
    chats: {getChatById},
  } = useMst();

  const c = getChatById(chat._id);

  useEffect(() => {
    c.setMessage();
  }, [c]);

  useEffect(() => {
    console.log(c.messages.rows.length);
  }, [c.messages.rows.length]);

  const onSend = async () => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages),
    // );
    const mess = await API.addChat(data);
    c.addMessage(mess);
  };

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
        messages={c.messages.rows.map((row) => mappingMessageChat(row))}
        onSend={onSend}
        user={{
          _id: _id,
        }}
        onInputTextChanged={(text) =>
          setData((state) => ({...state, content: text}))
        }
      />
    </Block>
  );
};

export default observer(Chat);
