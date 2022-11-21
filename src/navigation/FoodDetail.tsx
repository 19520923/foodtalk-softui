import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FoodContent} from '../screens';
import {FoodEvaluate} from '../screens';
import {FontAwesome} from '@expo/vector-icons';
import {Block, Text} from '../components/atoms';
import {useTheme} from '../hooks';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const FoodDetail = () => {
  const navigation = useNavigation();
  const {sizes} = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: 'Name Food',
      headerRight: () => (
        <Block align="center" justify="center" row marginRight={16}>
          <Text marginRight={5} size={sizes.sm}>
            8
          </Text>
          <FontAwesome name="star" size={20} color={'#FFCE31'} />
        </Block>
      ),
    });
  }, [navigation, sizes.sm]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Recipe" component={FoodContent} />
      <Tab.Screen name="Evaluate" component={FoodEvaluate} />
    </Tab.Navigator>
  );
};

export default FoodDetail;
