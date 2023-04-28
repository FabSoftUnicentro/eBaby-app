/* eslint-disable react-native/no-inline-styles */
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import OrangeButton from '../../components/OrangeButton';
import api from '../../services/api';

const TestKid = require('../../storage/controllers/TestKidController');
import styles from './styles';
const Kid = require('../../storage/controllers/KidController');
const Agent = require('../../storage/controllers/AgentController');

const Item = ({name}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeftPartition}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
      </View>
      <View style={styles.itemRightPartition}>
        <Text style={styles.pendent}>ENVIO</Text>
        <Text style={styles.pendent}>PENDENTE</Text>
      </View>
    </View>
  );
};

const Historic = (props) => {
  const [dataArray, setDataArray] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const tk = TestKid.index();
    setDataArray(Array.from(tk));
  }, []);

  function getKidName(cpf) {
    return Kid.index(cpf).name;
  }

  function handleSendAll() {
    setIsDisable(true);
    const testkid = TestKid.index();
    const kid = Kid.getAllDone();
    const agent = Agent.index();

    if (
      JSON.stringify(kid) !== JSON.stringify({}) &&
      JSON.stringify(testkid) !== JSON.stringify({})
    ) {
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
      NetInfo.fetch().then((state) => {
        if (state.isInternetReachable) {
          api
            .post('/registerKid', body, {timeout: 10000})
            .then((res) => {
              if (res.data.success === true) {
                Kid.destroy(kid);
                TestKid.destroy(testkid);
                props.navigation.navigate('AuthAfterTest', {
                  status: require('../../assets/animations/success.json'),
                  alertTitle: 'Muito bem!',
                  alertContent: 'Seus testes foram enviados com sucesso',
                  nextRoute: 'Home',
                });
              } else {
                Alert.alert(
                  'Algum erro ocorreu!',
                  'Tente os envios dos dados mais tarde',
                  [{text: 'OK', onPress: () => {}}],
                  {cancelable: false},
                );
                setIsDisable(false);
              }
            })
            .catch((res) => {
              Alert.alert(
                'Não foi possivel estabelecer conexao com o servidor!',
                'Tente os envios dos dados mais tarde',
                [{text: 'OK', onPress: () => {}}],
                {cancelable: false},
              );
              setIsDisable(false);
            });
        } else {
          Alert.alert(
            'Parece que você está sem conexão',
            'Faça o envio dos dados quando estiver conectado a internet!',
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
          setIsDisable(false);
        }
      });
    } else {
      ToastAndroid.show(
        'Voce não tem nenhum teste para enviar :(',
        ToastAndroid.LONG,
      );
    }
  }

  if (!dataArray) {
    return null;
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={{flex: 1}}
    >
      {JSON.stringify(dataArray) !== JSON.stringify([]) ? (
        <>
          <ScrollView>
            {dataArray.map((item) => (
              <Item key={item.cpfKid} name={getKidName(item.cpfKid)} />
            ))}
          </ScrollView>
          <View
            style={{
              height: 68,
              justifyContent: 'center',
              paddingHorizontal: '5%',
            }}
          >
            <OrangeButton
              onClick={() => handleSendAll()}
              buttonText={'ENVIAR TODOS'}
              disabled={isDisable}
            />
          </View>
        </>
      ) : (
        <View style={styles.withoutTestView}>
          <Text style={styles.textAlert}>
            Voce nao tem nenhum teste com envio pendente
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default Historic;
