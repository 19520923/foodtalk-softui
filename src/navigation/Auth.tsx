import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Register, Login} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();
const AuthStack = createNativeStackNavigator();

const ScreensStack = () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  return (
    <Stack.Navigator
      initialRouteName={t('screens.login')}
      screenOptions={screenOptions.stack}>
      <Stack.Screen
        name={t('screens.signup')}
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={t('screens.login')}
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <AuthStack.Screen name="Screens" component={ScreensStack} />
    </AuthStack.Navigator>
  );
};
