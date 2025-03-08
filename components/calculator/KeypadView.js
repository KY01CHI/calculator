// File: src/components/KeypadView.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalcButton from './CalcButton';

const KeypadView = ({ 
  handlePress, 
  handleClear, 
  handleBackspace, 
  handleCalculate,
  handleToggleSign 
}) => {
  return (
    <>
      <View style={styles.row}>
        <CalcButton text="C" onPress={handleClear} isFunction />
        <CalcButton text="±" onPress={handleToggleSign} isFunction />
        <CalcButton text="⌫" onPress={handleBackspace} isFunction />
        <CalcButton text="÷" onPress={() => handlePress('÷', '/')} isOperator />
      </View>

      <View style={styles.row}>
        <CalcButton text="7" onPress={() => handlePress('7')} />
        <CalcButton text="8" onPress={() => handlePress('8')} />
        <CalcButton text="9" onPress={() => handlePress('9')} />
        <CalcButton text="×" onPress={() => handlePress('×', '*')} isOperator />
      </View>

      <View style={styles.row}>
        <CalcButton text="4" onPress={() => handlePress('4')} />
        <CalcButton text="5" onPress={() => handlePress('5')} />
        <CalcButton text="6" onPress={() => handlePress('6')} />
        <CalcButton text="-" onPress={() => handlePress('-')} isOperator />
      </View>
      
      <View style={styles.row}>
        <CalcButton text="1" onPress={() => handlePress('1')} />
        <CalcButton text="2" onPress={() => handlePress('2')} />
        <CalcButton text="3" onPress={() => handlePress('3')} />
        <CalcButton text="+" onPress={() => handlePress('+')} isOperator />
      </View>

      <View style={styles.row}>
        <CalcButton text="0" onPress={() => handlePress('0')} isWide />
        <CalcButton text="." onPress={() => handlePress('.')} />
        <CalcButton text="=" onPress={handleCalculate} isOperator />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  }
});

export default KeypadView;