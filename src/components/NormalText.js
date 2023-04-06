import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const NormalText = props => {
  return <Text style={styles.normal}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  normal: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});

export default NormalText;
