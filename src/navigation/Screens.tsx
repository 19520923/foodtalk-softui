import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home,
  Profile,
  Register,
  Pro,
  Login,
  Notifications,
  Comment,
  CreatePost
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Search from '../screens/Search';
import BottomBar from './BottomBar';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen name="Home" component={BottomBar} />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Comment"
        component={Comment}
        options={screenOptions.back}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={screenOptions.back}
      />
    </Stack.Navigator>
  );
};
