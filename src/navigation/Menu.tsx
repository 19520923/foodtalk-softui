import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Linking, StyleSheet} from 'react-native';

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Text, Switch, Button, Image} from '../components/atoms';
import {useData, useTheme, useTranslation} from '../hooks';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  // screen list for Drawer menu
  const screens = [
    {name: t('screens.home'), to: 'Home', icon: assets.home},
    {
      name: t('screens.imagePicker'),
      to: t('navigation.imagePicker'),
      icon: assets.settings,
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{
        paddingBottom: sizes.padding,
        backgroundColor: colors.background,
      }}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.s}>
          <Image
            radius={0}
            width={33}
            height={33}
            color={colors.primary}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text color={colors.black} size={12} semibold>
              {t('app.name')}
            </Text>
          </Block>
        </Block>

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          Settings
        </Text>

        <Block
          row
          justify="space-between"
          marginTop={sizes.sm}
          marginBottom={sizes.sm}>
          <Text p color={labelColor}>
            {t('darkMode')}
          </Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
            }}
          />
        </Block>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.s}
          marginBottom={sizes.s}
          onPress={() => handleWebLink('https://github.com')}>
          <Text p color={labelColor}>
            Edit Profile
          </Text>
        </Button>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.s}
          marginBottom={sizes.s}
          onPress={() => handleWebLink('https://github.com')}>
          <Text p color={labelColor}>
            Change Password
          </Text>
        </Button>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.s}
          marginBottom={sizes.s}
          onPress={() => handleWebLink('https://github.com')}>
          <Text p color={labelColor}>
            Edit Profile
          </Text>
        </Button>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.s}
          marginBottom={sizes.s}
          onPress={() => navigation.navigate(t('navigation.foodDetail'))}>
          <Text p color={labelColor}>
            Terms & Privacy
          </Text>
        </Button>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.sm}
          onPress={() => handleWebLink('https://google.com')}>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={'red'}
              source={assets.logout}
            />
          </Block>
          <Text p color={labelColor}>
            Logout
          </Text>
        </Button>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients, colors} = useTheme();

  return (
    <Block color={colors.background} gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: colors.white}}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: '70%',
          borderRightWidth: 0,
          backgroundColor: colors.background,
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
