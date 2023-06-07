/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BoldText from '../../components/BoldText';
import ImageZoom from 'react-native-image-pan-zoom';
import images from '../../assets/images';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {NavigationActions, StackActions} from 'react-navigation';
const TestKid = require('../../storage/controllers/TestKidController');

export function navigationOptions({navigation}) {
  var disableHeaderButton = false;
  function updateTestKid(result) {
    TestKid.update({
      id: navigation.state.params.id,
      name: navigation.state.params.key,
      result: result,
    });
    const resetAction = routeName =>
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: routeName})],
      });
    navigation.dispatch(resetAction('Test'));
  }

  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.buttonNoOP}
        disabled={disableHeaderButton}
        onPress={() => {
          disableHeaderButton = true;
          updateTestKid(2);
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            marginRight: 5,
          }}>
          Sem Oportunidade
        </Text>
        <Icon name={'ios-close'} size={28} color={'#6e7075'} />
      </TouchableOpacity>
    ),
    title: '',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack(null);
        }}
        style={{width: 50}}>
        <Icon name="ios-arrow-round-back" size={42} style={{left: 15}} />
      </TouchableOpacity>
    ),
  };
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const TestItem = props => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [can, setCan] = useState('');
  const [hint, setHint] = useState('');
  const [valid, setValid] = useState('');
  const [notValid, setNotValid] = useState('');
  const [atention, setAtention] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    setImage(images[props.navigation.state.params.image]);
    setTitle(props.navigation.state.params.key);
    setText(props.navigation.state.params.descricao);
    setQuestion(props.navigation.state.params.pergunta);
    setCan(props.navigation.state.params.pode);
    setHint(props.navigation.state.params.dica);
    setValid(props.navigation.state.params.vale);
    setNotValid(props.navigation.state.params.naovale);
    setAtention(props.navigation.state.params.atencao);
  }, [
    props.navigation.state.params.image,
    props.navigation.state.params.key,
    props.navigation.state.params.descricao,
    props.navigation.state.params.pergunta,
    props.navigation.state.params.pode,
    props.navigation.state.params.dica,
    props.navigation.state.params.vale,
    props.navigation.state.params.naovale,
    props.navigation.state.params.atencao,
  ]);

  function updateTestKid(result) {
    TestKid.update({
      id: props.navigation.state.params.id,
      name: props.navigation.state.params.key,
      result: result,
    });
    const resetAction = routeName =>
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: routeName})],
      });
    props.navigation.dispatch(resetAction('Test'));
  }

  if (image === '' || title === '' || text === '') {
    return null;
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={styles.container}>
      <View style={{flex: 4}}>
        <BoldText text={title} />
        <ImageZoom
          cropWidth={width * 0.9}
          cropHeight={height * 0.35}
          imageWidth={width * 0.9}
          imageHeight={height * 0.35}
          minScale={0.9}
          maxScale={4}
          style={styles.imageView}>
          <Image source={{uri: image}} style={styles.image} />
        </ImageZoom>
      </View>
      <View style={{flex: 4, top: 10}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'space-between'}}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.question}>{question}</Text>
          {atention ? (
            <Text style={styles.question}>
              Atenção: <Text style={styles.text}>{atention}</Text>
            </Text>
          ) : <></>}
          {hint ? (
            <Text style={styles.isValid}>
              Dica: <Text style={styles.text}>{hint}</Text>
            </Text>
          ) : (
            <></>
          )}
          {can ? (
            <Text style={styles.isValid}>
              Pode: <Text style={styles.text}>{can}</Text>
            </Text>
          ) : (
            <></>
          )}
          {valid ? (
            <Text style={styles.isValid}>
              Vale: <Text style={styles.text}>{valid}</Text>
            </Text>
          ) : (
            <></>
          )}
          {notValid ? (
            <Text style={styles.isNotValid}>
              Não Vale: <Text style={styles.text}>{notValid}</Text>
            </Text>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
      <View style={styles.horizontalView}>
        <TouchableOpacity
          style={styles.buttonFail}
          disabled={isDisable}
          onPress={() => {
            setIsDisable(true);
            updateTestKid(0);
          }}>
          <Text style={styles.buttonText}>Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOK}
          disabled={isDisable}
          onPress={() => {
            setIsDisable(true);
            updateTestKid(1);
          }}>
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TestItem;
