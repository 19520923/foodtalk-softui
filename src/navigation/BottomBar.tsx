import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme, useTranslation} from '../hooks';
import {Block, Button, Text} from '../components/atoms';
import {Home, Notifications, Profile} from '../screens';
import Search from '../screens/Search';
import {FontAwesome} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomBarContent = (props: any) => {
  const {t} = useTranslation();
  const {state, descriptors, navigation} = props;
  const {assets, colors, sizes} = useTheme();

  const icons = [assets.home, assets.search, assets.bell, assets.user];

  return (
    <Block row flex={0} justify="space-evenly" paddingVertical={sizes.s} white>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };
        return (
          <Button
            row
            justify="center"
            align="center"
            key={`bottom-screen-${route.name}-${index}`}
            onPress={onPress}>
            <Block align="center" justify="center">
              <FontAwesome
                name={icons[index]}
                color={isFocused ? colors.primary : colors.icon}
                size={sizes.icon}
              />
              {isFocused && (
                <Text semibold secondary>
                  {route.name}
                </Text>
              )}
            </Block>
          </Button>
        );
      })}
    </Block>
  );
};

export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomBarContent {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="News" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
