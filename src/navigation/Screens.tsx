import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Comment,
  CreatePost,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import BottomBar from './BottomBar';
import CreateFood from '../screens/CreateFood';
import PostDetail from '../screens/PostDetail';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

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
    </Stack.Navigator>
  );
};
