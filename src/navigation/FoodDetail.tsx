import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FoodContent from '../screens/FoodContent';
import FoodEvaluate from '../screens/FoodEvaluate';
import {HeaderTitle} from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();

const FoodDetail = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Recipe" component={FoodContent} />
      <Tab.Screen name="Evaluate" component={FoodEvaluate} />
    </Tab.Navigator>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({});
