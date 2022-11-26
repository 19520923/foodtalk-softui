import React from 'react';
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
} from '../screens';
import {useMst, useScreenOptions, useTranslation} from '../hooks';
import BottomBar from './BottomBar';
import CreateFood from '../screens/CreateFood';
import PostDetail from '../screens/PostDetail';
import {observer} from 'mobx-react-lite';
import {ForgotPassword} from '../screens';
import FoodDetail from './FoodDetail';

const Stack = createStackNavigator();

export default observer(() => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const {
    isLoggedIn,
    user: {profile},
  } = useMst();

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

  if (isLoggedIn && profile._id !== '') {
    return main();
  } else {
    return auth();
  }
});
