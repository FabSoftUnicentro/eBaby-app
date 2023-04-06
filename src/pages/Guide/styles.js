import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  question: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#7193c9',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#00007f'
  },
  questionText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 17,
  },
  answerText: {
    backgroundColor: '#c0dfdf',
    fontSize: 17,
    paddingHorizontal: 5,
    textAlign: 'left',
    borderBottomWidth: 1
  },
  icon: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center'
  },
  topic: {
    flex: 1,
  },
  topicText: {
    backgroundColor: '#c0dfdf',
    fontSize: 18,
    paddingHorizontal: 5,
    textAlign: 'left',
    borderBottomWidth: 1,
  },
});

export default styles;
