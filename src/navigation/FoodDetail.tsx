import {StyleSheet} from 'react-native';
import React from 'react';
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

  return (
    <Tab.Navigator>
      <Tab.Screen name="Recipe" component={FoodContent} />
      <Tab.Screen name="Evaluate" component={FoodEvaluate} />
    </Tab.Navigator>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 7,
    paddingHorizontal: 15,
  },
  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topText: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'gray',
    marginLeft: 15,
  },
  rightView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 16,
  },
  markText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: 'pink',
    marginRight: 5,
  },
});
