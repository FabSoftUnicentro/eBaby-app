import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const BoldText = props => {
  return <Text style={styles.normal}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  normal: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BoldText;
