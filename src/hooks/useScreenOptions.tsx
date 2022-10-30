import React, {useState} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

import {useData} from './useData';
import {useTranslation} from './useTranslation';

import Text from '../components/atoms/Text';
import useTheme from '../hooks/useTheme';
import Button from '../components/atoms/Button';
import Block from '../components/atoms/Block';

import {FontAwesome} from '@expo/vector-icons';
import {ImageDesc} from '../components/molecules';
import { useIsDrawerOpen } from '@react-navigation/drawer';

export default () => {
  const {t} = useTranslation();
  const {user} = useData();
  const navigation = useNavigation();
    const isDrawerOpen = useIsDrawerOpen();
  const {icons, colors, gradients, sizes, assets} = useTheme();
  const [open, setOpen] = useState(false);

  const _handleOpenCreateCard = () => {
    setOpen(!open);
  };

  const _handleNavigateCreatePost = () => {
    navigation.navigate(t('navigation.createPost'));
  };

  const _handleNavigateCreateFood = () => {
    navigation.navigate(t('navigation.createFood'));
  };

  const CreateCard = () => (
      <Block card style={{position: 'absolute', right: 32, top: 32}}>
        <TouchableOpacity>
          <Block row padding={sizes.s}>
            <FontAwesome
              name={icons.story}
              size={sizes.icon}
              color={colors.icon}
            />
            <Text p marginLeft={sizes.sm}>
              Story
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={_handleNavigateCreatePost}>
          <Block row padding={sizes.s}>
            <FontAwesome
              name={icons.post}
              size={sizes.icon}
              color={colors.icon}
            />
            <Text p marginLeft={sizes.sm}>
              Post
            </Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={_handleNavigateCreateFood}>
          <Block row padding={sizes.s}>
            <FontAwesome
              name={icons.food}
              size={sizes.icon}
              color={colors.icon}
            />
            <Text p marginLeft={sizes.sm}>
              Food recipe
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
  );

  const menu = {
    headerStyle: {elevation: 0},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {marginLeft: -sizes.sm},
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}: StackHeaderTitleProps) => (
      <Text p>{children}</Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <FontAwesome name={isDrawerOpen?icons:icons.menu} color={colors.icon} size={sizes.icon} />
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
            navigation.navigate('Screens', {
              screen: 'Pro',
            })
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
    create: {
      ...menu,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <FontAwesome
            name={assets.back}
            color={colors.icon}
            size={sizes.icon}
          />
        </Button>
      ),
      headerRight: () => (
        <Button
          secondary
          minHeight={sizes.l}
          width={80}
          onPress={() => console.log('press')}>
          <Text p bold white>
            Post
          </Text>
        </Button>
      ),
    },
  };

  return options;
};
