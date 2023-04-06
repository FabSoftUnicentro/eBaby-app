/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {StackActions, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './pages/Login';
import Home from './pages/Home';
import Test from './pages/Test';
import Historic from './pages/Historic';
import RegisterKid from './pages/RegisterKid';
import TestItem, {navigationOptions as navTestItem} from './pages/TestItem';
import RegisterAgent from './pages/RegisterAgent';
import AuthTestRegister from './middlewares/AuthTestRegister';
import AuthLogin from './middlewares/AuthLogin';
import AfterTest from './pages/AfterTest';
import AuthAfterTest from './middlewares/AuthAfterTest';
import AuthLogOut from './middlewares/AuthLogOut';
import Guide from './pages/Guide';
import GuideListItens from './pages/GuideListItens';
import GuideTest, { navigationOptions } from './pages/GuideTest';

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    RegisterAgent: {
      screen: RegisterAgent,
      navigationOptions:({navigation}) => ({
        headerShown: true,
        headerTitle: 'Cadastro do agente',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}
            style={{width: 50}}>
            <Icon name="ios-arrow-round-back" size={42} style={{left: 15}} />
          </TouchableOpacity>
        ),
      }),
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const resetAction = routeName =>
  StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: routeName})],
  });

const HomeSwitch = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    RegisterKid: {
      screen: RegisterKid,
      navigationOptions: ({navigation}) => ({
        title: 'Cadastro da criança',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(resetAction('Home'));
            }}
            style={{width: 50}}>
            <Icon name="ios-close" size={42} style={{left: 15}} />
          </TouchableOpacity>
        ),
      }),
    },
    AuthTestRegister: {
      screen: AuthTestRegister,
      navigationOptions: {
        headerShown: false,
      },
    },
    Test: {
      screen: Test,
      navigationOptions: ({navigation}) => ({
        title: 'Realização do Teste',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(resetAction('Home'));
            }}
            style={{width: 50}}>
            <Icon name="ios-close" size={42} style={{left: 15}} />
          </TouchableOpacity>
        ),
      }),
    },
    TestItem: {
      screen: TestItem,
      navigationOptions: navTestItem,
    },
    AfterTest: {
      screen: AfterTest,
      navigationOptions: {
        title: 'Finalizar teste',
      },
    },
    AuthAfterTest: {
      screen: AuthAfterTest,
      navigationOptions: {
        headerShown: false,
      },
    },
    AuthLogOut: {
      screen: AuthLogOut,
      navigationOptions: {
        headerShown: false,
      },
    },
    Historic: {
      screen: Historic,
      navigationOptions: ({navigation}) => ({
        title: 'Envios Pendentes',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}
            style={{width: 50}}>
            <Icon name="ios-arrow-round-back" size={42} style={{left: 15}} />
          </TouchableOpacity>
        ),
      }),
    },
    Guide: {
      screen: Guide,
      navigationOptions: ({navigation}) => ({
        title: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}
            style={{width: 50}}>
            <Icon name="ios-arrow-round-back" size={42} style={{left: 15}} />
          </TouchableOpacity>
        ),
      }),
    },
    GuideListItens: {
      screen: GuideListItens,
      navigationOptions:  {
        title: ''
      },
    },
    GuideTest: {
      screen: GuideTest,
      navigationOptions: navigationOptions,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ffffff',
        height: 48,
      },
    },
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    Login: LoginStack,
    Home: HomeSwitch,
    AuthLogin: AuthLogin,
  },
  {
    initialRouteName: 'AuthLogin',
  },
);

const Routes = createAppContainer(SwitchNavigator);

export default Routes;
