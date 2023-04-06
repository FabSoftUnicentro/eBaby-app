import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
const TestKid = require('../storage/controllers/TestKidController');
import {StackActions, NavigationActions} from 'react-navigation';

const AuthTestRegister = ({navigation}) => {

  useEffect(() => {
    const hasKid = TestKid.show();

    const resetAction = routeName =>
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: routeName})],
      });

    if (!hasKid) {
      navigation.dispatch(resetAction('RegisterKid'));
    } else {
      navigation.dispatch(resetAction('Test'));
    }
  }, []);

  return <View/>;
};

export default AuthTestRegister;
