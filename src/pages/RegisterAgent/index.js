/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import styles from './styles';
import {TextInputMask} from 'react-native-masked-text';
import OrangeButton from '../../components/OrangeButton';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import api from '../../services/api';

const RegisterAgent = ({navigation}) => {
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [cpf, setCpf] = useState('');
  const [cell, setCell] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loading) {
      console.log("loading");
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }).start(() => {
          navigation.navigate('Login');
      });
    }
  }, [loading]);

  function validate() {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var cellRegex = /^\(\d{2}\)?\s*\d{4,5}-?\d{4}$/g;

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
    if (name.length > 2) {
    } else {
      ToastAndroid.show('NOME INVALIDO', ToastAndroid.SHORT);
      return;
    }

    if (cpfIsValid()) {
    } else {
      ToastAndroid.show('CPF INVALIDO', ToastAndroid.SHORT);
      return;
    }

    //valida celular
    if (cellRegex.test(cell)) {
    } else {
      ToastAndroid.show('TELEFONE INVALIDO', ToastAndroid.SHORT);
      return;
    }

    //valida email
    if (emailRegex.test(email)) {
    } else {
      ToastAndroid.show('EMAIL INVALIDO', ToastAndroid.SHORT);
      return;
    }

    //valida senha
    if (
      password.length > 5 &&
      password.length < 13 &&
      confirmPass.length > 5 &&
      confirmPass.length < 13
    ) {
      if (password === confirmPass) {
      } else {
        ToastAndroid.show(
          'A confirmçao de senha nao bate :(',
          ToastAndroid.SHORT,
        );
        return;
      }
    } else {
      ToastAndroid.show(
        'A senha precisa ter de 6 digitos a 12 digitos',
        ToastAndroid.SHORT,
      );
      return;
    }
    return true;
  }

  const register = async (body) => {
    setProgress(new Animated.Value(0));
    setIsDisable(true);
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        setLoading(true);
        if (validate()) {
          api
            .post('/register', body, {timeout: 10000})
            .then(res => {
              if (res.data.success === true) {
                Alert.alert(
                  'Seu cadastro foi enviado',
                  'Para realizar o login o cadastro tem que ser aprovado por um administrador',
                  [{text: 'OK', onPress: () => {}}],
                  {cancelable: false},
                );
                setLoading(false);
                console.log(res);
              } else {
                console.log(res);
                ToastAndroid.show(res.data.message, ToastAndroid.LONG);
              }
            })
            .catch(res => {
              console.log(res);
              setLoading(false);
              setIsDisable(false);
            });
        } else {
          setIsDisable(false);
        }
      } else {
        setIsDisable(false);
        ToastAndroid.show(
          'Parece que voce está sem internet :(',
          ToastAndroid.LONG,
        );
      }
    });
  }

  return (
    <LinearGradient
    start={{x: 0, y: 0}}
    colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
    style={styles.container}>
    <ScrollView>
      <TextInput
        style={styles.input}
        onChangeText={name => setName(name)}
        value={name}
        placeholderTextColor={'#505050'}
        placeholder={'Nome Completo'}
        autoCorrect={false}
        autoCompleteType="off"
        returnKeyType="next"
      />
      <TextInputMask
        style={styles.input}
        onChangeText={cpf => setCpf(cpf)}
        value={cpf}
        placeholderTextColor={'#505050'}
        placeholder={'CPF'}
        type={'cpf'}
        autoCorrect={false}
        autoCompleteType="off"
      />
      <TextInputMask
        style={styles.input}
        onChangeText={cell => setCell(cell)}
        value={cell}
        placeholderTextColor={'#505050'}
        placeholder={'Telefone'}
        type={'cel-phone'}
      />
      <TextInput
        style={styles.input}
        onChangeText={email => setEmail(email)}
        value={email}
        placeholderTextColor={'#505050'}
        placeholder={'Email'}
      />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={password => setPassword(password)}
          value={password}
          placeholderTextColor={'#505050'}
          secureTextEntry={!show}
          placeholder={'Senha'}
        />
        <TouchableOpacity
          style={styles.inputIconRight}
          onPress={() => setShow(!show)}>
          <Icon
            name={'ios-eye'}
            size={26}
            color={show ? 'rgba(142,142,142,142)' : '#00001f'}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={confirmPass => setConfirmPass(confirmPass)}
        value={confirmPass}
        placeholderTextColor={'#505050'}
        secureTextEntry={true}
        placeholder={'Confirmar Senha'}
      />
      <OrangeButton
        buttonText="Confirmar"
        disabled={isDisable}
        onClick={() => register({cpf, name, cellphone: cell, email, password})}
      />
    </ScrollView>
    {loading ? <LottieView source={require('../../assets/animations/loading.json')} progress={progress} loop={true} autoPlay={true}/> : null}
    </LinearGradient>
  );
};

export default RegisterAgent;
