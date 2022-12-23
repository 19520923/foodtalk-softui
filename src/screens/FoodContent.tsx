import {Platform} from 'react-native';
import React from 'react';
import {Block, Image} from '../components/atoms';
import {useTheme} from '../hooks';
import {Text} from '../components/atoms';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IParamList} from '../constants/types';

const isAndroid = Platform.OS === 'android';

const FoodContent = () => {
  const {sizes} = useTheme();
  const route = useRoute<RouteProp<IParamList, 'Food'>>();
  const {food} = route.params;

  return (
    <Block safe paddingTop={sizes.s}>
      <Block
        scroll
        flex={0}
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}>
        <Image
          radius={0}
          resizeMode="cover"
          source={{uri: food.photo}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: 220}}
          marginTop={sizes.s}
        />
        <Block marginLeft={sizes.s} paddingTop={sizes.s}>
          <Text semibold primary h4 paddingVertical={sizes.s}>
            {food.name}
          </Text>

          <Text semibold secondary marginBottom={sizes.m}>
            {food.about}
          </Text>

          <Block marginBottom={sizes.m}>
            <Text h5 bold marginBottom={sizes.s}>
              Ingredients
            </Text>

            {food.ingredients.map((ingredient, index) => {
              return (
                <Text key={index} p left={sizes.s} marginBottom={sizes.s}>
                  - {ingredient}
                </Text>
              );
            })}
          </Block>

          <Block>
            <Text h5 bold marginBottom={sizes.s}>
              Process
            </Text>

            {food.recipe.map((proc, index) => {
              return (
                <Text key={index} p left={sizes.s} marginBottom={sizes.s}>
                  {index + 1}. {proc}
                </Text>
              );
            })}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default FoodContent;
