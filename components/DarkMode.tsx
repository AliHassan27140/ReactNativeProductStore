import React, {useState} from 'react';
import {View} from 'react-native';
import DarkModeToggle from 'react-dark-mode-toggle';

const DarkMode = ({props}: any) => {
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  return (
    <View style={{height: 50, width: 50, backgroundColor: 'red'}}>
      <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={80} />
    </View>
  );
};

export default DarkMode;
