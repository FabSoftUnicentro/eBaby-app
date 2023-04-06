import React, {useState, useEffect} from 'react';
import {Animated, Easing, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {StackActions, NavigationActions} from 'react-navigation';

const AuthAfterTest = ({navigation}) => {
  const {status, alertTitle, alertContent, nextRoute} = navigation.state.params;
  const [progress, setProgress] = useState(new Animated.Value(0));

  const resetAction = routeName =>
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: routeName})],
    });

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3500,
      easing: Easing.linear,
    }).start(() => {
      Alert.alert(
        `${alertTitle}`,
        `${alertContent}`,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
      navigation.dispatch(resetAction(nextRoute));     
    });
  });

  return (
    <LottieView
      source={status}
      progress={progress}
    />
  );
};

export default AuthAfterTest;
