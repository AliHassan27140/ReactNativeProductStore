import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllItems from '../screens/AllItems';
import ProductDetail from '../screens/ProductDetail';
import Login from '../screens/Login';
import MainDrawerNavigator from './MainDrawerNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={MainDrawerNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
