import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import {StackActions, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
const Kid = require('../../storage/controllers/KidController');
const TestKid = require('../../storage/controllers/TestKidController');

const LabelName = props => {
  return (
    <View style={styles.label}>
      <Icon name={props.iconName} size={32} color={'#000'} />
      <Text style={styles.normal}>{props.text}</Text>
    </View>
  );
};

const FinalizeOrCancel = props => {
  return (
    <View style={styles.btnHorinzontalView}>
      <TouchableOpacity style={styles.buttonCancel} onPress={props.cancel}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFinalize} onPress={props.finalize}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
};

const Topic = props => {
  const [expanded, setExpanded] = useState(false);
  const {itens} = TestKid.show();
  const data = props.data;
  const name = props.name;
  const isTopicDone = props.topicDone;

  function isItemDone(key) {
    for (var i = 0; i < itens.length; i++) {
      if (itens[i].name === key) {
        return true;
      }
    }
    return false;
  }

  function Accordion() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={isTopicDone ? styles.rowDone : styles.rowNotDone}
          onPress={() => setExpanded(!expanded)}>
          <Text style={[styles.title, styles.font]}>{name}</Text>
          {isTopicDone ? (
                  <Icon
                    name={'done'}
                    color={'#000000'}
                    size={32}
                    style={styles.inputIcon}
                  />
                ) : null}
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {expanded && (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{marginTop: -3}}>
            {data.map(item => (
              <TouchableOpacity
                key={item.key}
                style={
                  isItemDone(item.key)
                    ? styles.buttonDone
                    : styles.buttonNotDone
                }
                onPress={() => {
                  isItemDone(item.key)
                    ? ToastAndroid.show(
                        'VOCÊ JÁ REALIZOU ESTE ITEM',
                        ToastAndroid.SHORT,
                      )
                    : props.navigation.navigate('TestItem', item);
                }}>
                <Text style={styles.itemText}>{item.key}</Text>
                {isItemDone(item.key) ? (
                  <Icon
                    name={'done'}
                    color={'#000000'}
                    size={32}
                    style={styles.inputIcon}
                  />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    );
  }

  return <Accordion />;
};

const Test = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [ps, setPs] = useState('');
  const [mf, setMf] = useState('');
  const [li, setLi] = useState('');
  const [mg, setMg] = useState('');
  const {itens} = TestKid.show();

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const {name, birthAge, gestationalAge} = Kid.show();
    const date1 = new Date(birthAge);
    const date2 = new Date();
    const diffDays = getDiffDays(date1, date2);

    function getDiffDays(dateA, dateB) {
      return Math.ceil(
        Math.abs(dateA.getTime() - dateB.getTime()) / (1000 * 3600 * 24),
      );
    }

    function getAgeInMonthAndDays() {
      const MONTH_DAYS = 30;
      var auxDiffDays = diffDays;
      let days = auxDiffDays % MONTH_DAYS;
      // eslint-disable-next-line no-bitwise
      let month = (auxDiffDays / 30) | 0;

      if (month > 0 && days > 0) {
        return `${month}m e ${days}d`;
      } else if (days > 0) {
        return `${days}d`;
      } else {
        return `${month}m`;
      }
    }

    function filterByDate(obj) {
      var auxGestationalAge = gestationalAge;
      var auxDiffDays = diffDays;
      if (gestationalAge < 38) {
        auxGestationalAge = (40 - auxGestationalAge) * 7;
        auxDiffDays -= auxGestationalAge;
      }

      if (obj.diaInicial <= diffDays && obj.diaFinal >= auxDiffDays) {
        return true;
      } else {
        return false;
      }
    }

    setName(name);
    setAge(getAgeInMonthAndDays());
    setMf(require('../../assets/itens/MotorFino.json').filter(filterByDate));
    setLi(require('../../assets/itens/Linguagem.json').filter(filterByDate));
    setPs(
      require('../../assets/itens/PessoalSocial.json').filter(filterByDate),
    );
    setMg(
      require('../../assets/itens/MotorGrosseiro.json').filter(filterByDate),
    );
  }, []);

  const resetAction = routeName =>
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: routeName})],
    });

  function cancelTest() {
    const destroyTest = () => {
      const kid_to_delete = Kid.show();
      const testkid_to_delete = TestKid.show();
      var isKidDeleted = Kid.destroy(kid_to_delete);
      var isTestKidDeleted = TestKid.destroy(testkid_to_delete);
      if (isKidDeleted && isTestKidDeleted) {
        navigation.dispatch(resetAction('Home'));
      }
    };

    return Alert.alert(
      'Você realmente deseja cancelar o teste?',
      'Todos os dados referente a esse teste serão perdidos!',
      [
        {
          text: 'Não',
          onPress: () => {},
        },
        {
          text: 'Sim',
          onPress: () => destroyTest(),
        },
      ],
      {cancelable: false},
    );
  }

  function isTopicDone(topic) {
    var counter = 0;
    for (var i = 0; i < topic.length; i++) {
      for (var j = 0; j < itens.length; j++) {
        if (topic[i].key === itens[j].name) {
          counter++;
          break;
        }
      }
    }
    return counter === topic.length;
  }

  function finalizeTest() {
    const sumLength = ps.length + mf.length + li.length + mg.length;
    if (sumLength === itens.length) {
      navigation.navigate('AfterTest');
    } else {
      ToastAndroid.show(
        'VOCÊ PRECISA REALIZAR TODOS OS ITENS PARA AVANÇAR',
        ToastAndroid.SHORT,
      );
    }
  }

  if (
    name === '' ||
    age === '' ||
    ps === '' ||
    mf === '' ||
    li === '' ||
    mg === ''
  ) {
    return null;
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#c0dfdf', '#ACD2EA', '#5aabab']}
      style={styles.container}>
      <View style={styles.box}>
        <LabelName iconName={'child-care'} text={name} />
        <LabelName iconName={'today'} text={age} />
      </View>
      <View style={styles.topics}>
        <ScrollView>
          <Topic
            name={'Pessoal Social'}
            data={ps}
            navigation={navigation}
            topicDone={isTopicDone(ps)}
          />
          <Topic
            name={'Motor Fino-Adaptativo'}
            data={mf}
            navigation={navigation}
            topicDone={isTopicDone(mf)}
          />
          <Topic
            name={'Linguagem'}
            data={li}
            navigation={navigation}
            topicDone={isTopicDone(li)}
          />
          <Topic
            name={'Motor Grosseiro'}
            data={mg}
            navigation={navigation}
            topicDone={isTopicDone(mg)}
          />
        </ScrollView>
      </View>
      <FinalizeOrCancel
        cancel={() => cancelTest()}
        finalize={() => finalizeTest()}
      />
    </LinearGradient>
  );
};

export default Test;
