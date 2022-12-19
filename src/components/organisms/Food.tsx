import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme, useTranslation} from '../../hooks';
import {TFoodModel} from '../../stores/models/FoodModel';
import {Card} from '../molecules';

interface Props {
  inline?: boolean;
  food: TFoodModel;
}

const Food = ({food, inline}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {sizes} = useTheme();
  const _handleToFoodDetail = () => {
    navigation.navigate(
      t('navigation.foodDetail') as never,
      {food: food} as never,
    );
  };
  return (
    <TouchableOpacity onPress={_handleToFoodDetail} activeOpacity={1}>
      <Card
        inline={inline}
        description={food.about}
        image={{uri: food.photo}}
        title={food.name}
        subcription={String((food.score / food.num_rate).toFixed(0))}
        marginRight={sizes.s}
      />
    </TouchableOpacity>
  );
};

export default Food;
