/**
 * @format
 */

import 'react-native';
import React from 'react';
import RegisterAgent from '../src/pages/RegisterAgent';

import {shallow} from 'enzyme';

describe('RegisterAgent Screen', () => {
  const wrapper = shallow(<RegisterAgent/>);
  describe('Rendering => ', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    }) 
  });
  describe('Events => ', () => {

    // name change event
    it('should set the name value on change event', () => {
      wrapper.find('TextInput[placeholder="Nome Completo"]').prop('onChangeText')('Nome Teste');
      expect(wrapper.find('TextInput[placeholder="Nome Completo"]').prop('value')).toEqual('Nome Teste');
    });

    // cpf change event
    it('should set the cpf value on change event', () => {
      wrapper.find('TextInputMask[placeholder="CPF"]').prop('onChangeText')('111.111.111-11');
      expect(wrapper.find('TextInputMask[placeholder="CPF"]').prop('value')).toEqual('111.111.111-11');
    });

    // cellphone change event
    it('should set the cellphone value on change event', () => {
      wrapper.find('TextInputMask[placeholder="Telefone"]').prop('onChangeText')('(44)99967-7258');
      expect(wrapper.find('TextInputMask[placeholder="Telefone"]').prop('value')).toEqual('(44)99967-7258');
    });

    // email change event
    it('should set the email value on change event', () => {
      wrapper.find('TextInput[placeholder="Email"]').prop('onChangeText')('email@email.com');
      expect(wrapper.find('TextInput[placeholder="Email"]').prop('value')).toEqual('email@email.com');
    });

    // password change event
    it('should set the password value on change event', () => {
      wrapper.find('TextInput[placeholder="Senha"]').prop('onChangeText')('password123');
      expect(wrapper.find('TextInput[placeholder="Senha"]').prop('value')).toEqual('password123');
    });

    // confirm password change event
    it('should set the confirm password value on change event', () => {
      wrapper.find('TextInput[placeholder="Confirmar Senha"]').prop('onChangeText')('password123');
      expect(wrapper.find('TextInput[placeholder="Confirmar Senha"]').prop('value')).toEqual('password123');
    });
    
    // submit form event
    it('should call the dispatch function and disable the submit on button click', () => {
      wrapper.find('OrangeButton').simulate('click').prop('onClick');
      expect(
        wrapper.find('OrangeButton').prop('disabled'),
      ).toBeTruthy();
    });
  });
});
