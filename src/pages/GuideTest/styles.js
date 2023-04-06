import {StyleSheet, Dimensions} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#f5f7fa',
  },
  imageView: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    width: width,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
  textView: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'normal',
    marginBottom: 5,
    textAlign: 'left',
  },
  question: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  isValid: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  isNotValid: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  horizontalView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonOK: {
    height: 48,
    width: '47%',
    marginTop: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonFail: {
    height: 48,
    width: '47%',
    marginTop: 10,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonNoOP: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    marginRight: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF',
  },
});

export default styles;
