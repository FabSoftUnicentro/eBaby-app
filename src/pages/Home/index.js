/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import api from '../../services/api';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
const TestKid = require('../../storage/controllers/TestKidController');
const Agent = require('../../storage/controllers/AgentController');

const ClosedBox = ({handleExpand}) => {
  return (
    <View style={styles.closedBox}>
      <TouchableOpacity onPress={handleExpand}>
        <Icon name={'expand-more'} size={64} />
      </TouchableOpacity>
    </View>
  );
};

const OpennedBox = ({handleExpand, name, cpf}) => {
  return (
    <View style={styles.boxParent}>
      <View style={styles.closedBox}>
        <TouchableOpacity onPress={handleExpand}>
          <Icon name={'expand-less'} size={64} />
        </TouchableOpacity>
      </View>
      <View style={styles.openBox}>
        <View style={styles.box}>
          <View>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.accpfs}>Agente Comunitário de Saude</Text>
          </View>
          <View>
            <Text style={styles.name}>{cpf}</Text>
            <Text style={styles.accpfs}>CPF</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const agent = Agent.index();
    setName(agent.name);
    setCpf(agent.cpf);
  }, []);

  const handleChangeIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    var isAgentDeleted = null
    var havetestkid = null;
    havetestkid= TestKid.index();
    if (JSON.stringify(havetestkid) === JSON.stringify({})){
      isAgentDeleted = Agent.destroy(Agent.show());
      if (isAgentDeleted === true) {
        navigation.navigate('AuthLogOut');
      } else {
        ToastAndroid.show('Algum erro ocorreu', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Você precisa enviar todos os testes pendentes para sair da sua conta', ToastAndroid.LONG);
    }
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={styles.container}>
      {isOpen ? (
        <OpennedBox
          handleExpand={() => handleChangeIsOpen()}
          name={name}
          cpf={cpf}
        />
      ) : (
        <ClosedBox handleExpand={() => handleChangeIsOpen()} />
      )}
      <View style={styles.menu}>
        <View style={styles.row}>
          <View style={styles.upperLeftTopic}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AuthTestRegister');
              }}>
              <Icon
                name={'child-care'}
                size={64}
                color={'#00007f'}
                style={styles.icon}
              />
              <Text style={styles.name}>Iniciar Teste</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.upperRightTopic}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Historic');
              }}>
              <Icon
                name={'receipt'}
                size={64}
                color={'#00007f'}
                style={styles.icon}
              />
              <Text style={styles.name}>Envios Pendentes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.bottomLeftTopic}>
            <TouchableOpacity onPress={() => {navigation.navigate('Guide')}}>
              <Icon
                name={'library-books'}
                size={64}
                color={'#00007f'}
                style={styles.icon}
              />
              <Text style={styles.name}>Manual</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRightTopic}>
            <TouchableOpacity onPress={() => handleLogOut()}>
              <Icon
                name={'exit-to-app'}
                size={64}
                color={'#00007f'}
                style={styles.icon}
              />
              <Text style={styles.name}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Home;
