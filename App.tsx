/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainDrawerNavigator from './navigations/MainDrawerNavigator';
import MainStackNavigator from './navigations/MainStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
      {/* <MainDrawerNavigator /> */}
    </NavigationContainer>
  );
};
export default App;
