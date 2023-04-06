import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

const GuideListItens = (props) => {
  const [topic, setTopic] = useState('');
  useEffect(() => {
    const params = props.navigation.state.params;
    const type = params.type;
    switch(type) {
      case 1:
        setTopic(require('../../assets/itens/Linguagem.json'));
      break;

      case 2:
        setTopic(require('../../assets/itens/MotorFino.json'));
      break;
      case 3:
        setTopic(require('../../assets/itens/MotorGrosseiro.json'));
      break;

      case 4:
        setTopic(require('../../assets/itens/PessoalSocial.json'));
      break;

      default:
        setTopic('falhou');
      break;
    }
  }, [
    props.navigation.state.params.type
  ]);

  if(topic == null || topic == '')
    return <View/>

  return <ScrollView contentContainerStyle={{paddingHorizontal: 5, paddingVertical: 5}}>
    <View style={{borderBottomWidth: 1}}/>
    {topic.map(item => (
      <TouchableOpacity style={styles.buttonNotDone} onPress={() => {
        props.navigation.navigate('GuideTest', item);
      }}>
        <Text>{item.key}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>;
}


export default GuideListItens;
