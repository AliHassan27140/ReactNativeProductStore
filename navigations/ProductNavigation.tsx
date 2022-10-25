import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllItems from '../screens/AllItems';
import ProductDetail from '../screens/ProductDetail';
import Soon from '../screens/Soon';
import WobbleExample from '../screens/WobbleExample';
import Cart from '../screens/Cart';

const ProductStack = createStackNavigator();
const ProductNavigation = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProductStack.Screen name="AllItems" component={AllItems} />
      <ProductStack.Screen name="ProductDetails" component={ProductDetail} />
      <ProductStack.Screen name="Soon" component={Soon} />
      <ProductStack.Screen name="WobbleExample" component={WobbleExample} />
      <ProductStack.Screen name="Cart" component={Cart} />
    </ProductStack.Navigator>
  );
};
export default ProductNavigation;
