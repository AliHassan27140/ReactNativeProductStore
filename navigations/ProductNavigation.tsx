import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllItems from '../screens/AllItems';
import ProductDetail from '../screens/ProductDetail';

const ProductStack = createStackNavigator();
const ProductNavigation = () => {
  return (
    <ProductStack.Navigator screenOptions={{headerShown: false}}>
      <ProductStack.Screen name="Main" component={AllItems} />
      <ProductStack.Screen name="ProductDetails" component={ProductDetail} />
    </ProductStack.Navigator>
  );
};
export default ProductNavigation;
