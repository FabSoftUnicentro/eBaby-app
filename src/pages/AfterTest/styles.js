import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topicName: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: '5%',
  },
  info: {
    justifyContent: 'center',
  },
  box: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#fdfdfd',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  label: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  normal: {
    fontSize: 16,
    color: '#000000',
    alignSelf: 'center',
    marginLeft: 5,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  result: {
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  comment: {
    justifyContent: 'center',
  },
  input: {
    height: 48,
    paddingHorizontal: 10,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    borderWidth: 1,
    borderColor: '#fdfdfd',
  },
  finalize: {
    justifyContent: 'center',
  },
  btnFinalize: {
    marginTop: 10,
    width: '90%',
    height: 48,
    backgroundColor: '#ff4500',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbtnFinalize: {
    fontSize: 16,
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default styles;
