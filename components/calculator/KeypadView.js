import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Make sure Text is imported
import CalcButton from './CalcButton';

const KeypadView = ({ 
  handlePress,      // Function to handle button presses
  handleClear,      // Function to clear the calculator
  handleBackspace,  // Function to delete the last character
  handleCalculate,  // Function to calculate the result
  handleToggleSign  // Function to toggle the sign of the current number
}) => {
  return (
    <>
      {/* First row: Clear, Toggle Sign, Backspace, Divide */}
      <View style={styles.row}>
        <CalcButton text="C" onPress={handleClear} isFunction />
        <CalcButton text="±" onPress={handleToggleSign} isFunction />
        <CalcButton text="⌫" onPress={handleBackspace} isFunction />
        <CalcButton text="÷" onPress={() => handlePress('÷', '/')} isOperator />
      </View>

      {/* Second row: 7, 8, 9, Multiply */}
      <View style={styles.row}>
        <CalcButton text="7" onPress={() => handlePress('7')} />
        <CalcButton text="8" onPress={() => handlePress('8')} />
        <CalcButton text="9" onPress={() => handlePress('9')} />
        <CalcButton text="×" onPress={() => handlePress('×', '*')} isOperator />
      </View>

      {/* Third row: 4, 5, 6, Subtract */}
      <View style={styles.row}>
        <CalcButton text="4" onPress={() => handlePress('4')} />
        <CalcButton text="5" onPress={() => handlePress('5')} />
        <CalcButton text="6" onPress={() => handlePress('6')} />
        <CalcButton text="-" onPress={() => handlePress('-')} isOperator />
      </View>
      
      {/* Fourth row: 1, 2, 3, Add */}
      <View style={styles.row}>
        <CalcButton text="1" onPress={() => handlePress('1')} />
        <CalcButton text="2" onPress={() => handlePress('2')} />
        <CalcButton text="3" onPress={() => handlePress('3')} />
        <CalcButton text="+" onPress={() => handlePress('+')} isOperator />
      </View>

      {/* Fifth row: 0 (wide), Decimal Point, Equals */}
      <View style={styles.row}>
        <CalcButton text="0" onPress={() => handlePress('0')} isWide />
        <CalcButton text="." onPress={() => handlePress('.')} />
        <CalcButton text="=" onPress={handleCalculate} isOperator />
      </View>
    </>
  );
};

// Styles for the keypad rows
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',             // Arrange buttons horizontally
    justifyContent: 'space-between',  // Space buttons evenly
    marginBottom: 10,                 // Space between rows
    paddingHorizontal: 10,            // Horizontal padding for the row
  }
});

export default KeypadView;