import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image} from '../components/atoms';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Notifications, Profile} from '../screens';
import Search from '../screens/Search';
import {useAnimatedRef} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomBarContent = (props: any) => {
  const {t} = useTranslation();
  const {state, descriptors, navigation} = props;
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;
  const ref = useAnimatedRef();

  const icons = [assets.home, assets.search, assets.bell, assets.profile];

  return (
    <Block row flex={0} justify="space-evenly">
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
            <Block flex={0} radius={16} align="center" justify="center">
              <Image
                radius={0}
                source={icons[index]}
                height={20}
                width={20}
                color={colors[isFocused ? 'primary' : 'black']}
              />
            </Block>
          </Button>
        );
      })}
    </Block>
  );
};

export default () => {
  const {colors, sizes} = useTheme();

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
