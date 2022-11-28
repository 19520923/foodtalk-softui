import React, {useCallback, useState} from 'react';
import {Platform} from 'react-native';
import {Block, Button, Image, Input, Switch, Text} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {ICFood} from '../constants/types';
import {useMst, useTheme} from '../hooks';

const isAndroid = Platform.OS === 'android';

const CreateFood = () => {
  const {sizes, assets} = useTheme();
  const [food, setFood] = useState<ICFood>({
    name: '',
    is_public: true,
    recipe: [],
    ingredients: [],
  });
  const {
    user: {profile},
  } = useMst();

  const _handleChange = useCallback(
    (value) => {
      setFood((state) => ({...state, ...value}));
    },
    [setFood],
  );
  return (
    <Block safe paddingTop={sizes.s}>
      <Block
        scroll
        flex={0}
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}>
        <ImageDesc
          title={profile.name}
          description={profile.username}
          image={{uri: profile.avatar_url}}
        />
        <Block
          row
          flex={0}
          align="center"
          padding={sizes.s}
          justify="space-between">
          <Block row>
            <Text p semibold>
              {food.is_public ? 'Public' : 'Only me'}
            </Text>
            <Text p marginLeft={sizes.s}>
              {food.is_public
                ? '(Every one can see your receip)'
                : '(Only me can see your receip)'}
            </Text>
          </Block>
          <Switch
            marginRight={sizes.s}
            checked={food.is_public}
            onPress={(checked) => _handleChange({is_public: checked})}
          />
        </Block>
        <Input placeholder="Name of food?" multiline noBorder />
        <Image
          radius={0}
          resizeMode="cover"
          source={assets.carousel1}
          style={{width: '100%'}}
          marginTop={sizes.s}
        />
        <Block marginTop={sizes.m} paddingHorizontal={sizes.s}>
          <Text p semibold marginBottom={sizes.s}>
            Ingredients
          </Text>
          <Block left={sizes.s} marginBottom={sizes.s}>
            <Text p>- 50g Rice</Text>
          </Block>
          <Block row align="center">
            <Input placeholder="Amount" style={{width: '25%'}} />
            <Block marginHorizontal={sizes.s}>
              <Input placeholder="Ingredient" />
            </Block>
            <Button width={64} secondary>
              <Text bold white>
                Add
              </Text>
            </Button>
          </Block>
        </Block>
        <Block marginTop={sizes.sm} paddingHorizontal={sizes.s}>
          <Text p semibold marginBottom={sizes.s}>
            Process
          </Text>
          <Block left={sizes.s} marginBottom={sizes.s}>
            <Text p>1. Cook 30m with hot water</Text>
          </Block>
          <Block row align="center">
            <Block marginRight={sizes.s}>
              <Input placeholder="New step" />
            </Block>
            <Button width={64} secondary>
              <Text bold white>
                Add
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default CreateFood;
