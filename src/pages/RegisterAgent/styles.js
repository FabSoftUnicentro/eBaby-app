import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
  },
  input: {
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#00001f',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  inputIconRight: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default styles;
