import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from '../screens/Login';
import AllItems from '../screens/AllItems';
import DarkMode from '../components/DarkMode';
import DrawerDesign from '../components/DrawerDesign';
import ProductDetail from '../screens/ProductDetail';
import ProductNavigation from './ProductNavigation';
import Customdrawer from '../screens/CustomeDrawer';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      // drawerContent={() => <DrawerDesign />}
      drawerContent={props => <Customdrawer {...props} />}>
      {/* <Drawer.Screen name="DarkMode" component={DarkMode} /> */}
      {/* <Drawer.Screen name="AllItems" component={AllItems} /> */}
      <Drawer.Screen name="Products" component={ProductNavigation} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
