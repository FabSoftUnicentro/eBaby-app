import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';

const AuthLogOut = ({navigation}) => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => {
      navigation.navigate('Login');     
    });
  });

  return (
    <LottieView
      source={require('../assets/animations/loading.json')}
      progress={progress}
    />
  );
};

export default AuthLogOut;
