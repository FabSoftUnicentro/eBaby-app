import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 36,
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  sendAll: {
    bottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000666',
    height: 48,
    width: 164,
  },
  sendAllText: {
    fontSize: 18,
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 64,
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#89cff0',
    paddingLeft: 10,
  },
  itemLeftPartition: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  itemRightPartition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendent: {
    fontSize: 18,
    color: '#000019',
  },
  name: {
    fontSize: 16,
  },
  buttonSend: {
    width: '60%',
    height: 32,
    backgroundColor: '#ff4500',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  buttonDone: {
    width: '60%',
    height: 32,
    backgroundColor: '#13be68',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  withoutTestView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  textAlert: {
    fontSize: 24, 
    textAlign: 'center',
  }
});

export default styles;
