/**
 * @format
 */

import 'react-native';
import React from 'react';
import RegisterKid from '../src/pages/RegisterKid';

import {shallow} from 'enzyme';

describe('RegisterKid Screen', () => {
  const wrapper = shallow(<RegisterKid/>);
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

    // birth age change event
    it('should set the birth age value on change event', () => {
      wrapper.find('TextInputMask[placeholder="Data de Nascimento"]').prop('onChangeText')('25/06/2019');
      expect(wrapper.find('TextInputMask[placeholder="Data de Nascimento"]').prop('value')).toEqual('25/06/2019');
    });

    // gestational age change event
    it('should set the gestational age value on change event', () => {
      wrapper.find('TextInput[placeholder="Tempo de Gestação (semanas)"]').prop('onChangeText')('40');
      expect(wrapper.find('TextInput[placeholder="Tempo de Gestação (semanas)"]').prop('value')).toEqual('40');
    });

    // weight password change event
    it('should set the confirm password value on change event', () => {
        wrapper.find('TextInput[placeholder="Peso (kg)"]').prop('onChangeText')('8.4');
        expect(wrapper.find('TextInput[placeholder="Peso (kg)"]').prop('value')).toEqual('8.4');
    });
    
    // height change event
    it('should set the password value on change event', () => {
      wrapper.find('TextInput[placeholder="Altura (cm)"]').prop('onChangeText')('71');
      expect(wrapper.find('TextInput[placeholder="Altura (cm)"]').prop('value')).toEqual('71');
    });

    // submit form event
    it('should call the dispatch function on button click', () => {
      wrapper.find('OrangeButton').simulate('click').prop('onClick');
      expect(
        wrapper.find('OrangeButton').prop('onClick'),
      ).toStrictEqual(expect.any(Function));
    });
  });
});
