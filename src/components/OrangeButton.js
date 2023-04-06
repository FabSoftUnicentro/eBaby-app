import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const OrangeButton = props => {
  return (
    <TouchableOpacity style={styles.button} disabled={props.disabled} onPress={props.onClick}>
      <Text style={styles.buttonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00001f',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
  },
});

export default OrangeButton;
