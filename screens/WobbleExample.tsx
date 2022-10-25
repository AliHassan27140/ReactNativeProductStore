import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function WobbleExample() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });
  const [data1, setData1] = useState(0);
  // component Lifecycle
  useEffect(() => console.log('mount'), []);
  useEffect(() => console.log('data1 update'), [data1]);
  useEffect(() => console.log('any update'));
  useEffect(() => () => console.log('data1 update or unmount', data1), [data1]);
  useEffect(() => () => console.log('unmount'), []);

  return (
    <>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="wobble"
        onPress={() => {
          setData1(data1 + 1);
          // will be filled in later
          rotation.value = withRepeat(withTiming(10), 6, true);
        }}
      />
      <Icon name="size-l" size={100} color="#260" />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'pink',
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 30,
  },
});

export default WobbleExample;
