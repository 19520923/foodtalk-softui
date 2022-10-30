import React, {useState} from 'react';
import {Platform} from 'react-native';
import {Block, Button, Image, Input, Switch, Text} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme} from '../hooks';

const isAndroid = Platform.OS === 'android';

type Props = {};

const CreateFood = (props: Props) => {
  const {colors, sizes, assets, gradients} = useTheme();
  const [isPublic, setPublic] = useState<boolean>(true);
  return (
    <Block safe paddingTop={sizes.s}>
      <Block
        scroll
        flex={0}
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}>
        <ImageDesc
          title="Nguyen Nhut Tan"
          description="tannn"
          image={assets.avatar1}
        />
        <Block
          row
          flex={0}
          align="center"
          padding={sizes.s}
          justify="space-between">
          <Block row>
            <Text p semibold>
              {isPublic ? 'Public' : 'Only me'}
            </Text>
            <Text p marginLeft={sizes.s}>
              {isPublic
                ? '(Every one can see your receip)'
                : '(Only me can see your receip)'}
            </Text>
          </Block>
          <Switch
            marginRight={sizes.s}
            checked={isPublic}
            onPress={(checked) => setPublic(checked)}
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
          <Block marginBottom={sizes.s}>
            <Text p>1. 50g Rice</Text>
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
            Receip
          </Text>
          <Block marginBottom={sizes.s}>
            <Text p>1. Cook 30m with hot water</Text>
          </Block>
          <Block row align='center'>
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
