import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Comment,
  CreatePost,
  Login,
  Register,
  ImagePicker,
  Map,
  AttachFood,
  UserList,
  Profile,
  Chat,
} from '../screens';
import {Storage, useMst, useScreenOptions, useTranslation} from '../hooks';
import BottomBar from './BottomBar';
import CreateFood from '../screens/CreateFood';
import PostDetail from '../screens/PostDetail';
import {observer} from 'mobx-react-lite';
import {ForgotPassword} from '../screens';
import FoodDetail from './FoodDetail';
import {ACCESS_TOKEN, BASE_URL} from '../constants/constants';
import {io, Socket} from 'socket.io-client';
import ChatList from '../screens/ChatList';

const Stack = createStackNavigator();

export default observer(() => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const [socket, setSocket] = useState<Socket>();
  const {
    isLoggedIn,
    user: {
      profile: {_id},
    },
    posts: {getPostById},
    notifications: {addNoti},
    searchFoods: {getFoodById},
  } = useMst();

  const _initSocket = async () => {
    const token = await Storage.getItem(ACCESS_TOKEN);
    const socketio = io(BASE_URL, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(socketio);

    socketio.on('connect', () => {
      console.log('connected');
    });

    socketio.on('post-reactions:likeDislike', ({post_id, user_id}) => {
      const post = getPostById(post_id);
      post?.like(user_id);
    });

    socketio.on('post-comment:create', (comment) => {
      const post = getPostById(comment.post);
      post?.addComment(comment);
    });

    socketio.on('notification:create', (noti) => {
      addNoti(noti);
    });

    socketio.on('food-rate:create', (rate) => {
      const food = getFoodById(rate.food);
      food?.addRate(rate);
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      _initSocket();
    } else {
      socket?.disconnect();
    }

    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const main = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions.stack}>
        <Stack.Screen name={t('app.name')} component={BottomBar} />
        <Stack.Screen
          name={t('screens.comment')}
          component={Comment}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.createPost')}
          component={CreatePost}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.createFood')}
          component={CreateFood}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.postDetail')}
          component={PostDetail}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.imagePicker')}
          component={ImagePicker}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.checkin')}
          component={Map}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.attachFoods')}
          component={AttachFood}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.foodDetail')}
          component={FoodDetail}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.userList')}
          component={UserList}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.profileScreen')}
          component={Profile}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.chatList')}
          component={ChatList}
          options={screenOptions.back}
        />
        <Stack.Screen
          name={t('screens.chat')}
          component={Chat}
          options={screenOptions.back}
        />
      </Stack.Navigator>
    );
  };

  const auth = () => {
    return (
      <Stack.Navigator
        initialRouteName={t('screens.login')}
        screenOptions={screenOptions.stack}>
        <Stack.Screen
          name={t('screens.login')}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={t('screens.register')}
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={t('screens.forgotPassword')}
          component={ForgotPassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  if (isLoggedIn && _id !== '') {
    return main();
  } else {
    return auth();
  }
});
