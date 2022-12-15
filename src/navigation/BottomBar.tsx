import React, {useMemo} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useMst, useTheme} from '../hooks';
import {Block, Button, Text} from '../components/atoms';
import {Home, Notifications, Profile} from '../screens';
import Search from '../screens/Search';
import {FontAwesome} from '@expo/vector-icons';
import _ from 'lodash';
import {observer} from 'mobx-react-lite';

const Tab = createBottomTabNavigator();

const BottomBarContent = (props: any) => {
  const {state, navigation, descriptors} = props;
  const {assets, colors, sizes, gradients} = useTheme();

  const icons = [assets.home, assets.search, assets.bell, assets.user];

  return (
    <Block
      row
      flex={0}
      justify="space-evenly"
      white
      paddingBottom={Platform.OS === 'ios' ? sizes.m : sizes.s}
      radius={sizes.shadowRadius}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const badge =
          options.tabBarBadge !== undefined ? options.tabBarBadge : 0;

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
              {isFocused && (
                <Block primary height={3} width={'150%'} radius={8} flex={0} />
              )}
              <Block marginTop={sizes.s} flex={0}>
                <FontAwesome
                  name={icons[index]}
                  color={isFocused ? colors.primary : colors.icon}
                  size={sizes.icon}
                />
              </Block>
              {isFocused && (
                <Text semibold secondary>
                  {route.name}
                </Text>
              )}
            </Block>
            {badge !== 0 && !isFocused && (
              <Block
                flex={0}
                padding={0}
                justify="center"
                position="absolute"
                top={sizes.s}
                right={sizes.xs}
                width={sizes.sm}
                height={sizes.sm}
                radius={sizes.sm / 2}
                gradient={gradients?.primary}>
                <Text
                  white
                  center
                  bold
                  size={10}
                  lineHeight={10}
                  paddingTop={3}>
                  {badge}
                </Text>
              </Block>
            )}
          </Button>
        );
      })}
    </Block>
  );
};

export default observer(() => {
  const {
    notifications: {rows},
  } = useMst();

  const numNotiNotSeen = useMemo(() => {
    return _.filter(rows, (e) => e.is_seen === false).length;
  }, [rows]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomBarContent {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="News"
        component={Notifications}
        options={{tabBarBadge: numNotiNotSeen}}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
});
