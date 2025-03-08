// File: src/components/CalcButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CalcButton = ({ text, onPress, isOperator, isFunction, isWide }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        isOperator ? styles.operatorButton : styles.numberButton,
        isFunction ? styles.functionButton : null,
        isWide ? styles.wideButton : null
      ]}
      onPress={onPress}
    >
      <Text style={[
        isOperator ? styles.operatorButtonText : styles.numberButtonText,
        isFunction ? styles.functionButtonText : null
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 4,
    height: 70,
  },
  wideButton: {
    flex: 2,
  },
  numberButton: {
    backgroundColor: '#464b5f',
  },
  numberButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
  },
  operatorButton: {
    backgroundColor: '#ff9d42',
  },
  operatorButtonText: {
    color: 'white',
    fontSize: 28, 
    fontWeight: '400',
  },
  functionButton: {
    backgroundColor: '#3d4154',
  },
  functionButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
  }
});

export default CalcButton;