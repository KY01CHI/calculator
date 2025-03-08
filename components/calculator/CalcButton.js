
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CalcButton = ({ 
  text,        // The text to display on the button
  onPress,     // Function to call when button is pressed
  isOperator,  // Flag for operator buttons (e.g., +, -, ×, ÷, =)
  isFunction,  // Flag for function buttons (e.g., C, ±, ⌫)
  isWide       // Flag for wide buttons (e.g., 0)
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,                                  // Base button styles
        isOperator ? styles.operatorButton : styles.numberButton,  // Operator or number style
        isFunction ? styles.functionButton : null,      // Function button style if applicable
        isWide ? styles.wideButton : null               // Wide button style if applicable
      ]}
      onPress={onPress}
    >
      <Text style={[
        isOperator ? styles.operatorButtonText : styles.numberButtonText,  // Operator or number text style
        isFunction ? styles.functionButtonText : null    // Function text style if applicable
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

// Styles for the calculator buttons
const styles = StyleSheet.create({
  button: {
    flex: 1,                // Take equal space within the row
    borderRadius: 12,       // Rounded corners
    alignItems: 'center',   // Center text horizontally
    justifyContent: 'center', // Center text vertically
    padding: 16,            // Internal padding
    margin: 4,              // Space between buttons
    height: 70,             // Fixed height for all buttons
  },
  wideButton: {
    flex: 2,                // Take double space for wide buttons
  },
  numberButton: {
    backgroundColor: '#464b5f',  // Dark gray for number buttons
  },
  numberButtonText: {
    color: 'white',         // White text for number buttons
    fontSize: 24,           // Large font for better visibility
    fontWeight: '400',      // Normal weight
  },
  operatorButton: {
    backgroundColor: '#ff9d42',  // Orange for operator buttons
  },
  operatorButtonText: {
    color: 'white',         // White text for operator buttons
    fontSize: 28,           // Slightly larger than numbers
    fontWeight: '400',      // Normal weight
  },
  functionButton: {
    backgroundColor: '#3d4154',  // Darker gray for function buttons
  },
  functionButtonText: {
    color: 'white',         // White text for function buttons
    fontSize: 24,           // Same as number buttons
    fontWeight: '400',      // Normal weight
  }
});

export default CalcButton;