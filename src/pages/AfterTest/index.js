/* eslint-disable react-native/no-inline-styles */
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationActions, StackActions} from 'react-navigation';
import LottieView from 'lottie-react-native';

import api from '../../services/api';

import styles from './styles';

const Kid = require('../../storage/controllers/KidController');
const TestKid = require('../../storage/controllers/TestKidController');
const Agent = require('../../storage/controllers/AgentController');

const LabelName = (props) => {
  return (
    <View style={styles.label}>
      <Icon name={props.iconName} size={32} color={'#000'} />
      <Text style={styles.normal}>{props.text}</Text>
    </View>
  );
};

const AfterTest = (props) => {
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const [birthAge, setBirthAge] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [weightList, setWeightList] = useState('');
  const [lengthList, setLengthList] = useState('');
  const [obs, setObs] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const kid = Kid.show();
    const testkid = TestKid.show();
    const date1 = new Date(kid.birthAge);
    const date2 = new Date();
    const diffDays = getDiffDays(date1, date2);

    function getDiffDays(dateA, dateB) {
      return Math.ceil(
        Math.abs(dateB.getTime() - dateA.getTime()) / (1000 * 3600 * 24),
      );
    }

    function getAgeInMonthAndDays() {
      const MONTH_DAYS = 30;
      var auxDiffDays = diffDays;
      let days = auxDiffDays % MONTH_DAYS;
      // eslint-disable-next-line no-bitwise
      let month = (auxDiffDays / 30) | 0;

      if (kid.sex === 'M') {
        setLengthList(
          require('../../assets/growth/AlturaMasculino.json').filter(
            (obj) => obj.mes === month,
          ),
        );
        setWeightList(
          require('../../assets/growth/PesoMasculino.json').filter(
            (obj) => obj.mes === month,
          ),
        );
      } else {
        setLengthList(
          require('../../assets/growth/AlturaFeminino.json').filter(
            (obj) => obj.mes === month,
          ),
        );
        setWeightList(
          require('../../assets/growth/PesoFeminino.json').filter(
            (obj) => obj.mes === month,
          ),
        );
      }

      if (month > 0 && days > 0) {
        return `${month}m e ${days}d`;
      } else if (days > 0) {
        return `${days}d`;
      } else {
        return `${month}m`;
      }
    }

    if (loading) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }).start();
    }

    setName(kid.name);
    setBirthAge(getAgeInMonthAndDays);
    setWeight(testkid.weight);
    setLength(testkid.length);
  }, [birthAge]);

  const resultWeigth = {
    veryUnder: 'Peso muito abaixo do normal',
    under: 'Peso abaixo do normal',
    above: 'Peso acima do normal',
    ok: 'Peso normal',
  };

  const resultLength = {
    veryUnder: 'Altura muito abaixo do normal',
    under: 'Altura abaixo do normal',
    above: 'Altura acima do normal',
    ok: 'Altura normal',
  };

  function getWeightResultInfo() {
    var text = '';
    var iconName = 'thumb-down';
    if (weight < weightList[0].ztn) {
      text = resultWeigth.veryUnder;
    } else if (weight < weightList[0].zdn) {
      text = resultWeigth.under;
    } else if (weight < weightList[0].zdp) {
      iconName = 'thumb-up';
      text = resultWeigth.ok;
    } else {
      text = resultWeigth.above;
    }
    return <LabelName iconName={iconName} text={text} />;
  }

  function getLengthResultInfo() {
    var text = '';
    var iconName = 'thumb-down';
    if (length < lengthList[0].ztn) {
      text = resultLength.veryUnder;
    } else if (length < lengthList[0].zdn) {
      text = resultLength.under;
    } else if (length < lengthList[0].zdp) {
      iconName = 'thumb-up';
      text = resultLength.ok;
    } else {
      text = resultLength.above;
    }
    return <LabelName iconName={iconName} text={text} />;
  }

  const resetAction = (routeName) =>
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: routeName})],
    });

  function finalizeTest(note) {
    setIsDisable(true);
    var ok = null;
    ok = TestKid.finalize(note);
    console.log(ok);
    const testkid = TestKid.index();
    const kid = Kid.getAllDone();
    const agent = Agent.index();
    var kidJSON = Array.from(kid);
    var tkJSON = Array.from(testkid);
    var agentJSON = agent;

    var body = {agent: agentJSON, kid: kidJSON, testkid: tkJSON};

    body = JSON.stringify(body, (key, value) => {
      if (key === 'itens') {
        return Array.from(value);
      }
      return value;
    });
    body = JSON.parse(body);
    if (ok === true) {
      setProgress(new Animated.Value(0));
      setIsDisable(true);
      NetInfo.fetch().then((state) => {
        if (state.isInternetReachable) {
          setLoading(true);
          api
            .post('/registerKid', body, {timeout: 10000})
            .then((res) => {
              if (res.data.success === true) {
                Kid.destroy(kid);
                TestKid.destroy(testkid);
                props.navigation.navigate('AuthAfterTest', {
                  status: require('../../assets/animations/success.json'),
                  alertTitle: 'Muito bem!',
                  alertContent: 'Seu teste foi enviado com sucesso!',
                  nextRoute: 'Home',
                });
              } else {
                props.navigation.navigate('AuthAfterTest', {
                  status: require('../../assets/animations/fail.json'),
                  alertTitle: 'Algum erro ocorreu!',
                  alertContent: 'Tente os envios dos dados mais tarde',
                  nextRoute: 'Home',
                });
              }
              setLoading(false);
            })
            .catch((res) => {
              props.navigation.navigate('AuthAfterTest', {
                status: require('../../assets/animations/fail.json'),
                alertTitle:
                  'Não foi possivel estabelecer conexao com o servidor!',
                alertContent: 'Tente o envio dos dados mais tarde',
                nextRoute: 'Home',
              });
              setLoading(false);
            });
        } else {
          props.navigation.navigate('AuthAfterTest', {
            status: require('../../assets/animations/fail.json'),
            alertTitle: 'Parece que você está sem conexão!',
            alertContent:
              'Faça o envio dos dados quando estiver conectado a internet',
            nextRoute: 'Home',
          });
        }
      });
    } else {
      props.navigation.navigate('AuthAfterTest', {
        status: require('../../assets/animations/fail.json'),
        alertTitle: 'Não foi possivel estabelecer conexao com o servidor!',
        alertContent: 'Tente o envio dos dados mais tarde',
        nextRoute: 'Home',
      });
    }
  }
  if (
    name === '' ||
    birthAge === '' ||
    weight === '' ||
    length === '' ||
    weightList === '' ||
    lengthList === ''
  ) {
    return null;
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.topicName}>Informações da criança</Text>
          <View style={styles.box}>
            <LabelName iconName={'child-care'} text={name} />
            <LabelName iconName={'today'} text={birthAge} />
            <LabelName iconName={'linear-scale'} text={`${weight}kg`} />
            <LabelName iconName={'straighten'} text={`${length}cm`} />
          </View>
        </View>
        <View style={styles.result}>
          <Text style={styles.topicName}>Resultados de peso e altura</Text>
          <View style={[styles.box, {justifyContent: 'space-evenly'}]}>
            {getWeightResultInfo()}
            {getLengthResultInfo()}
          </View>
        </View>
        <View style={styles.comment}>
          <Text style={styles.topicName}>Observações (não obrigatório)</Text>
          <TextInput
            placeholder={'Digite sua observação aqui'}
            style={styles.input}
            placeholderTextColor={'#505050'}
            value={obs}
            onChangeText={(ob) => setObs(ob)}
          />
        </View>
        <View style={styles.finalize}>
          <TouchableOpacity
            style={styles.btnFinalize}
            disabled={isDisable}
            onPress={() => finalizeTest(obs)}
          >
            <Text style={styles.txtbtnFinalize}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading ? <LottieView source={require('../../assets/animations/loading.json')} progress={progress} loop={true} autoPlay={true}/> : null}
    </LinearGradient>
  );
};
export default AfterTest;
