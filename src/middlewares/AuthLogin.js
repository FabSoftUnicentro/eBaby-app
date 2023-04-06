import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
const Agent = require('../storage/controllers/AgentController');

const AuthLogin = ({navigation}) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3500,
      easing: Easing.linear,
    }).start(() => {
      const hasAgent = Agent.index();
      if (!hasAgent) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }     
    });
  }, []);

  return (
    <LottieView
      source={require('../assets/animations/wellcome.json')}
      progress={progress}
    />
  );
};

export default AuthLogin;
