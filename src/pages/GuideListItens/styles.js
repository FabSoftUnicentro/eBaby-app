import {StyleSheet, Dimensions} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f7fa',
    paddingHorizontal: '5%',
    paddingVertical: width * 0.05,
  },
  areaContainer: {
    flex: 5,
    justifyContent: 'space-around',
  },
  labelBox: {
    width: '100%',
    backgroundColor: '#fbfbfb',
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
  },
  box: {
    width: '100%',
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
  },
  normal: {
    fontSize: 16,
    color: '#000000',
    alignSelf: 'center',
    marginLeft: 5,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    textAlign: 'left',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  horinzontalView: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  buttonFinalize: {
    height: 48,
    width: '47.5%',
    marginTop: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonCancel: {
    height: 48,
    width: '47.5%',
    marginTop: 10,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  btnHorinzontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  rowNotDone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    paddingLeft: 10,
    paddingRight: 15,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#7193c9',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  rowDone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    paddingLeft: 10,
    paddingRight: 15,
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#066300',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  parentHr: {
    height: 3,
    color: 'white',
    width: '100%',
  },
  buttonNotDone: {
    flexDirection: 'row',
    height: 46,
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  buttonDone: {
    flexDirection: 'row',
    height: 46,
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    backgroundColor: '#25c91a',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  inputIcon: {
    right: 0,
    alignSelf: 'center',
  },
  topics: {
    flex: 5,
    marginTop: 10,
  },
});

export default styles;
