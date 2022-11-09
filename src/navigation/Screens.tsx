import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Comment, CreatePost, Login, Register, ImagePicker, Map} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import BottomBar from './BottomBar';
import CreateFood from '../screens/CreateFood';
import PostDetail from '../screens/PostDetail';
import RootStore from '../stores/RootStore';
import {observer} from 'mobx-react-lite';

const Stack = createStackNavigator();

export default observer(() => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const {isLoggedIn} = RootStore;

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
          options={screenOptions.create}
        />
        <Stack.Screen
          name={t('screens.createFood')}
          component={CreateFood}
          options={screenOptions.create}
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
      </Stack.Navigator>
    );
  };

  if (isLoggedIn) {
    return main();
  } else {
    return auth();
  }
});
