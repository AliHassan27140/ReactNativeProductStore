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
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MainDrawerNavigator from './navigations/MainDrawerNavigator';
import MainStackNavigator from './navigations/MainStackNavigator';
import {getLoginStatus} from './services/productAPI';

const App = () => {
  const [loginStatus, setLoginStatus]: any = useState(null);

  const getLogin = async () => {
    let status = await getLoginStatus();
    console.log(31312321, status);

    setLoginStatus(status);
  };

  useEffect(() => {
    getLogin();
  }, []);

  console.log('loginStatus eee', loginStatus);

  if (loginStatus == true) {
    console.log('loginStatus 111', loginStatus);

    return (
      <NavigationContainer>
        <MainStackNavigator route={'Main'} />
        {/* <MainDrawerNavigator /> */}
      </NavigationContainer>
    );
  } else if (loginStatus == false) {
    console.log('loginStatus', loginStatus);
    return (
      <NavigationContainer>
        <MainStackNavigator route={'Login'} />
        {/* <MainDrawerNavigator /> */}
      </NavigationContainer>
    );
  }
};
export default App;
