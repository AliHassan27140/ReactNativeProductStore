import { DefaultTheme } from '@react-navigation/native';
import React, {useContext} from 'react';

const ThemeContext = React.createContext(DefaultTheme);
const ThemeUpdateContext = React.createContext(() => {});

export function useTheme() {
    return useContext(ThemeContext);
    }

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
    }
    
