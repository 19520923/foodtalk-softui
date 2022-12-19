/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

import {useTranslation} from './useTranslation';

import useTheme from '../hooks/useTheme';
import {Button, Block, Text} from '../components/atoms';

import {FontAwesome} from '@expo/vector-icons';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {HEIGHT, WIDTH} from '../constants/constants';

export default () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDrawerOpen = useIsDrawerOpen();
  const {icons, colors, gradients, sizes, assets} = useTheme();
  const [open, setOpen] = useState(false);

  const CREATE_CARD_ACTION = [
    {
      name: 'Story',
      icon: icons.story,
      onPress: () => null,
    },
    {
      name: 'Create post',
      icon: icons.post,
      onPress: () => _handleNavigateCreatePost(),
    },
    {
      name: 'Create food',
      icon: icons.food,
      onPress: () => _handleNavigateCreateFood(),
    },
  ];

  const _handleOpenCreateCard = () => {
    setOpen(!open);
  };

  const _handleNavigateCreatePost = () => {
    navigation.navigate(t('navigation.createPost') as never);
  };

  const _handleNavigateCreateFood = () => {
    navigation.navigate(t('navigation.createFood') as never);
  };

  const CreateCard = () => (
    <TouchableOpacity
      onPressIn={_handleOpenCreateCard}
      style={{
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        top: -14,
        right: -28,
      }}>
      <Block
        color={colors.background}
        card
        position="absolute"
        top={42}
        right={42}>
        {CREATE_CARD_ACTION.map((e, index) => (
          <TouchableOpacity key={index} onPress={e.onPress}>
            <Block row padding={sizes.s}>
              <FontAwesome
                name={e.icon}
                size={sizes.icon}
                color={colors.icon}
              />
              <Text color={colors.black} p marginLeft={sizes.sm}>
                {e.name}
              </Text>
            </Block>
          </TouchableOpacity>
        ))}
      </Block>
    </TouchableOpacity>
  );

  const menu = {
    headerStyle: {elevation: 0, backgroundColor: colors.background},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {
      marginLeft: -sizes.sm,
    },
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {
      paddingRight: sizes.s,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}: StackHeaderTitleProps) => (
      <Text color={colors.black} p>
        {children}
      </Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <FontAwesome
          name={isDrawerOpen ? icons.close : icons.menu}
          color={colors.icon}
          size={sizes.icon}
        />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{marginRight: sizes.sm}}
          //handle open modal with 3 option: story, post, food
          onPress={_handleOpenCreateCard}>
          <FontAwesome name={icons.plus} color={colors.icon} size={26} />
        </TouchableOpacity>
        {open && CreateCard()}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Screens' as never,
              {
                screen: 'Pro',
              } as never,
            )
          }>
          <FontAwesome
            name={icons.chat}
            color={colors.icon}
            size={sizes.icon}
          />
          <Block
            flex={0}
            padding={0}
            justify="center"
            position="absolute"
            top={-sizes.s}
            right={-sizes.s}
            width={sizes.sm}
            height={sizes.sm}
            radius={sizes.sm / 2}
            gradient={gradients?.primary}>
            <Text white center bold size={10} lineHeight={10} paddingTop={3}>
              3
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => (
        <Text p white>
          {t('navigation.components')}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <FontAwesome
            name={assets.menu}
            color={colors.icon}
            size={sizes.icon}
          />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <FontAwesome
            name={assets.back}
            color={colors.icon}
            size={sizes.icon}
          />
        </Button>
      ),
    },
  };

  return options;
};
