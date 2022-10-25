import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    
  } catch (e) {
    // saving error
    console.log('Error saving data:setItem', e);
  }
}

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      console.log('Value previously stored', value);
      return value;
    }
  } catch (e) {
    // error reading value
  }
}

export const multiSet = async (keyValue: string[]) => {
  try {
    const value = await AsyncStorage.multiSet(keyValue);
    if (value !== null) {
      // value previously stored
      console.log('Value previously stored: multiset', value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('Error multiset', e);
  }
}

export const multiGet = async (keys: string[]) => {
  
  try {
    const value = await AsyncStorage.multiGet(keys);
    if (value !== null) {
      // value previously stored
      console.log('Value previously stored: multiget', value);
      return value;
    }
  } catch (e) {
    // error reading value
  }
}




