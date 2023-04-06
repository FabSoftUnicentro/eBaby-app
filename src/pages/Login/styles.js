import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  input: {
    textAlign: 'left',
    paddingHorizontal: 40,
    height: 48,
    borderWidth: 1,
    borderColor: '#00001f',
    fontSize: 16,
    marginTop: 20,
  },
  inputIconLeft: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  inputIconRight: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  orangeText: {
    fontSize: 14,
    color: '#FF4500',
    textAlign: 'center',
  },
});

export default styles;
