import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  input: {
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#00001f',
    fontSize: 16,
    paddingHorizontal: 9,
    marginBottom: 5,
  },
  picker: {
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#00001f',
    paddingHorizontal: 0,
    fontSize: 16,
    marginBottom: 5,
  }
});

export default styles;
