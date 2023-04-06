import 'react-native';
import React from 'react';
import Login from '../src/pages/Login';
import {shallow} from 'enzyme';

describe('Login Screen', () => {
  const wrapper = shallow(<Login/>);
  describe('Rendering => ', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    }) 
  });
  describe('Events => ', () => {
    it('should set the email value on change event', () => {
      wrapper.find('TextInput[placeholder="Email"]')
        .prop('onChangeText')('email@email.com');

      expect(wrapper.find('TextInput[placeholder="Email"]')
        .prop('value')).toEqual('email@email.com');
    });
    it('should set the password value on change event', () => {
      wrapper.find('TextInput[placeholder="Senha"]')
        .prop('onChangeText')('password123');

      expect(wrapper.find('TextInput[placeholder="Senha"]')
        .prop('value')).toEqual('password123');
    });
    it('should call the dispatch function and disable the submit on button click', () => {
      wrapper.find('OrangeButton').simulate('click').prop('onClick');
      expect(wrapper.find('OrangeButton').prop('onClick'))
        .toStrictEqual(expect.any(Function));
      expect(wrapper.find('OrangeButton').prop('disabled'))
        .toBeTruthy();
    });
  });
});