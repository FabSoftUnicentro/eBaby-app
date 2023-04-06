/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {View, TextInput, ScrollView, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInputMask} from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import OrangeButton from '../../components/OrangeButton';
import {StackActions, NavigationActions} from 'react-navigation';
import moment from 'moment';
const TestKid = require('../../storage/controllers/TestKidController');
const Kid = require('../../storage/controllers/KidController');
const Agent = require('../../storage/controllers/AgentController');

const RegisterKid = ({navigation}) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cpfAgent, setCpfAgent] = useState('');
  const [birthAge, setBirthAge] = useState('');
  const [gestationalAge, setGestationalAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const agent = Agent.index();
    setCpfAgent(agent.cpf);
  }, []);

  function handleSubmit(kid, testkid) {
    setIsDisable(true);
    var isKidCreated = false;
    var isTestKidCreated = false;

    function validate() {
      const cpfIsValid = () => {
        var Soma;
        var Resto;
        Soma = 0;
        Resto = 0;
        var cpfUnmasked = cpf;
        cpfUnmasked = cpfUnmasked.replace('.', '');
        cpfUnmasked = cpfUnmasked.replace('.', '');
        cpfUnmasked = cpfUnmasked.replace('-', '');
        if (cpfUnmasked == '00000000000') {
          return false;
        }

        for (var i = 1; i <= 9; i++) {
          Soma = Soma + parseInt(cpfUnmasked.substring(i - 1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) {
          Resto = 0;
        }
        if (Resto != parseInt(cpfUnmasked.substring(9, 10))) {
          return false;
        }

        Soma = 0;
        for (var i = 1; i <= 10; i++) {
          Soma = Soma + parseInt(cpfUnmasked.substring(i - 1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) {
          Resto = 0;
        }
        if (Resto != parseInt(cpfUnmasked.substring(10, 11))) {
          return false;
        }
        return true;
      };

      //valida nome
      if (name.length > 1 && name.length < 61) {
      } else {
        ToastAndroid.show(
          'O NOME DEVE TER ENTRE 2 E 60 LETRAS',
          ToastAndroid.SHORT,
        );
        return;
      }

      //valida cpf
      if (cpfIsValid()) {
      } else {
        ToastAndroid.show('CPF INVALIDO', ToastAndroid.SHORT);
        return;
      }

      //valida data de nascimento
      if (moment(birthAge, 'DD/MM/YYYY', true).isValid()) {
        const birthAgeSplited = birthAge.split('/');
        const date1 = new Date(
          `${birthAgeSplited[2]}/${birthAgeSplited[1]}/${birthAgeSplited[0]}`,
        );

        function getDiffDays(dateA, dateB) {
          return Math.ceil(
            Math.abs(dateA.getTime() - dateB.getTime()) / (1000 * 3600 * 24),
          );
        }
        const date2 = new Date();
        const diffDays = getDiffDays(date1, date2);

        if (date2 < date1) {
          ToastAndroid.show(
            'A DATA DE NASCIMENTO NÃO PODE SER MAIOR QUE A DATA ATUAL',
            ToastAndroid.SHORT,
          );
          return;
        } else {
          if (diffDays < 721) {
          } else {
            ToastAndroid.show(
              'A CRIANÇA NAO PODE TER MAIS DE 2 ANOS',
              ToastAndroid.SHORT,
            );
            return;
          }
        }
      } else {
        ToastAndroid.show('COLOQUE UMA DATA VALIDA', ToastAndroid.SHORT);
        return;
      }

      //valida idade gestacional
      if (gestationalAge > 29 && gestationalAge < 51) {
      } else {
        ToastAndroid.show(
          'O TEMPO DE GESTAÇÃO DEVE SER DE 30 A 50',
          ToastAndroid.SHORT,
        );
        return;
      }

      //valida peso (KG)
      if (weight >= 0.1 && weight <= 100) {
      } else {
        ToastAndroid.show(
          'COLOQUE SOMENTE NÚMEROS POSITIVOS NO CAMPO DE PESO',
          ToastAndroid.SHORT,
        );
        return;
      }

      //valida altura (CM)
      if (height >= 0.1 && height <= 200) {
      } else {
        ToastAndroid.show(
          'COLOQUE SOMENTE NÚMEROS POSITIVOS NO CAMPO DE ALTURA',
          ToastAndroid.SHORT,
        );
        return;
      }

      //valida sexo
      if (sex !== '') {
      } else {
        ToastAndroid.show('SELECIONE O SEXO DA CRIANÇA', ToastAndroid.SHORT);
        return;
      }

      return true;
    }

    if (validate()) {
      isKidCreated = Kid.store(kid);
      isTestKidCreated = TestKid.store(testkid);
      if (isKidCreated && isTestKidCreated) {
        const resetAction = routeName =>
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: routeName})],
          });
        navigation.dispatch(resetAction('Test'));
      }
    } else {
      setIsDisable(false);
    }
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={name => setName(name)}
            value={name}
            placeholder={'Nome Completo'}
            placeholderTextColor={'#505050'}
            autoCorrect={false}
            autoCompleteType="off"
            returnKeyType="next"
          />
        </View>
        <View>
          <TextInputMask
            style={styles.input}
            onChangeText={cpf => setCpf(cpf)}
            value={cpf}
            placeholder={'CPF'}
            placeholderTextColor={'#505050'}
            type={'cpf'}
            autoCorrect={false}
            autoCompleteType="off"
          />
        </View>
        <View>
          <TextInputMask
            style={styles.input}
            onChangeText={birthAge => setBirthAge(birthAge)}
            value={birthAge}
            placeholder={'Data de Nascimento'}
            type={'datetime'}
            autoCorrect={false}
            placeholderTextColor={'#505050'}
            autoCompleteType="off"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={gestationalAge => setGestationalAge(gestationalAge)}
            value={gestationalAge}
            placeholder={'Tempo de Gestação (semanas)'}
            keyboardType="numeric"
            placeholderTextColor={'#505050'}
            autoCorrect={false}
            autoCompleteType="off"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={weight => setWeight(weight)}
            value={weight}
            placeholder={'Peso (kg)'}
            keyboardType="decimal-pad"
            autoCorrect={false}
            placeholderTextColor={'#505050'}
            autoCompleteType="off"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={height => setHeight(height)}
            value={height}
            placeholder={'Altura (cm)'}
            placeholderTextColor={'#505050'}
            keyboardType="numeric"
            autoCorrect={false}
            autoCompleteType="off"
          />
        </View>
        <View style={styles.picker}>
          <RNPickerSelect
            placeholder={{label: 'Selecione o sexo', value: ''}}
            placeholderTextColor={'#505050'}
            items={[
              {label: 'Masculino', value: 'M'},
              {label: 'Feminino', value: 'F'},
            ]}
            onValueChange={sex => setSex(sex)}
          />
        </View>
        <View>
          <OrangeButton
            buttonText="Confirmar"
            onClick={() =>
              handleSubmit(
                {
                  cpf,
                  name,
                  birthAge,
                  gestationalAge,
                  sex,
                },
                {
                  cpfKid: cpf,
                  cpfAgent: cpfAgent,
                  weight,
                  length: height,
                  done: false,
                  note: '',
                },
                )
              }
              disabled={isDisable}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default RegisterKid;
