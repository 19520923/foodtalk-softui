import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FoodContent} from '../screens';
import {FoodEvaluate} from '../screens';
import {FontAwesome} from '@expo/vector-icons';
import {Block, Text} from '../components/atoms';
import {useTheme} from '../hooks';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {IParamList} from '../constants/types';

const Tab = createMaterialTopTabNavigator();

const FoodDetail = () => {
  const navigation = useNavigation();
  const {sizes} = useTheme();
  const route = useRoute<RouteProp<IParamList, 'Food'>>();
  const {food} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: food.name,
      headerRight: () => (
        <Block align="center" justify="center" row marginRight={16}>
          <Text marginRight={5} size={sizes.sm}>
            {food.score}
          </Text>
          <FontAwesome name="star" size={20} color={'#FFCE31'} />
        </Block>
      ),
    });
  }, [food, navigation, sizes.sm]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Recipe"
        component={FoodContent}
        initialParams={{food: food}}
      />
      <Tab.Screen
        name="Evaluate"
        component={FoodEvaluate}
        initialParams={{food: food}}
      />
    </Tab.Navigator>
  );
};

export default FoodDetail;
