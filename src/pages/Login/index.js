/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  Easing,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import api from '../../services/api';
const Agent = require('../../storage/controllers/AgentController');
import BoldText from '../../components/BoldText';
import NormalText from '../../components/NormalText';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import OrangeButton from '../../components/OrangeButton';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const Login = props => {
  const [email, setEmail] = useState('');
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loading) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }).start(() => {
        if (authenticated){
          props.navigation.navigate('Home');
        }           
      });
    }
  }, [loading, authenticated]);

  const handleLogIn = async () => {
    setProgress(new Animated.Value(0));
    setIsDisable(true);
    const body = {email, password};
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        setLoading(true);
        api.post('/authenticate', body, {timeout: 10000}).then(res => {
          if (res.data.success === true) {
            const agent = {
              cpf: res.data.cpfAgente,
              email: res.data.email,
              name: res.data.name,
              token: res.data.token,
            };
            Agent.store(agent);
            setAuthenticated(true);
          } else {
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            setIsDisable(false);
            setLoading(false);
          }
        });
      } else {
        setIsDisable(false);
        setLoading(false);
        ToastAndroid.show('Sem conexão com a internet', ToastAndroid.SHORT);
      }
    });
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={styles.container}>
      <BoldText text="Bem vindo Profissional de Saúde da Família" />
      <View>
        <NormalText text="Acompanhamento do Desenvolvimento Infantil eDenver" />
        <View>
          <Icon
            name={'ios-mail'}
            size={28}
            style={styles.inputIconLeft}
            color={'#00001f'}
          />
          <TextInput
            style={styles.input}
            onChangeText={email => setEmail(email)}
            placeholderTextColor={'#505050'}
            value={email}
            placeholder={'Email'}
          />
        </View>
        <View>
          <Icon
            name={'ios-lock'}
            size={26}
            style={styles.inputIconLeft}
            color={'#000'}
          />
          <TextInput
            style={styles.input}
            onChangeText={password => setPassword(password)}
            placeholderTextColor={'#505050'}
            value={password}
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
        <OrangeButton buttonText="Entrar" onClick={() => handleLogIn()} disabled={isDisable}/>
      </View>
      <View>
        <BoldText text="Não possui cadastro?" />
        <View>
          <TouchableOpacity
            testID={'GoToRegisterAgent'}
            onPress={() => {
              props.navigation.navigate('RegisterAgent');
            }}>
            <Text style={styles.orangeText}>Cadastre Aqui</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? <LottieView source={require('../../assets/animations/loading.json')} progress={progress} loop={true} autoPlay={true}/> : null}
    </LinearGradient>
  );
};

export default Login;
