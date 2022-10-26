/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import React, {useEffect, useState, createContext} from 'react';
import {View, useColorScheme} from 'react-native';
import MainDrawerNavigator from './navigations/MainDrawerNavigator';
import MainStackNavigator from './navigations/MainStackNavigator';
import {getLoginStatus} from './services/productAPI';
import SplashScreen from 'react-native-splash-screen';
import {darkTheme, lightTheme} from './styles/theme';

export const ThemeContext = createContext({});

const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <NavigationContainer theme={theme == 'dark' ? darkTheme : lightTheme}>
        {children}
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

const App = () => {
  const [loginStatus, setLoginStatus]: any = useState();

  const getLogin = async () => {
    let status = await AsyncStorage.getItem('loginStatus');
    console.log('status', status);

    if (status) {
      setLoginStatus(JSON.parse(status));
    } else {
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  useEffect(() => {
    console.log('loginStatus', loginStatus);
  }, [loginStatus]);

  if (loginStatus === true) {
    SplashScreen.hide();
    return (
      <ThemeProvider>
        <MainStackNavigator route={'Main'} />
      </ThemeProvider>
    );
  } else if (loginStatus == false) {
    return (
      <ThemeProvider>
        <MainStackNavigator route={'Login'} />
      </ThemeProvider>
    );
  } else {
    return <View></View>;
  }
};
export default App;
