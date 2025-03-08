// app/tabs/Calculator.tsx
// Main Calculator component that orchestrates the calculator functionality
import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import CalcDisplay from '../../components/calculator/CalcDisplay';
import KeypadView from '../../components/calculator/KeypadView';
import HistoryView from '../../components/calculator/HistoryView';
import { useCalculator } from '../../hooks/useCalculator';

const Calculator: React.FC = () => {
  // State to toggle between calculator and history views
  const [showHistory, setShowHistory] = useState<boolean>(false);
  // Reference to scroll view for auto-scrolling the display
  const scrollViewRef = useRef<any>(null);
  
  // Destructure all calculator-related state and functions from the custom hook
  const { 
    displayExpression,         // The expression shown to the user (with display symbols)
    calculationExpression,     // The expression used for calculation (with JS operators)
    history,                   // Array of previous calculations
    isError,                   // Flag for error state
    handlePress,               // Function to handle button presses
    handleCalculate,           // Function to calculate the result
    handleClear,               // Function to clear the display
    handleBackspace,           // Function to delete the last character
    handleToggleSign,          // Function to toggle the sign of the number
    setHistory,                // Function to update history
    setDisplayExpression,      // Function to update display expression
    setCalculationExpression,  // Function to update calculation expression
    setIsError                 // Function to update error state
  } = useCalculator(scrollViewRef);

  // Auto-scroll to bottom when display expression changes
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [displayExpression]);

  // Toggle between calculator and history views
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Use a history item as the current expression
  const useHistoryItem = (item: {expression: string, result: string}) => {
    setDisplayExpression(item.result);
    setCalculationExpression(item.result);
    setShowHistory(false);
    setIsError(false);
  };

  return (
    // Dismiss keyboard when tapping outside input areas
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {/* Conditionally render history view or calculator view */}
          {showHistory ? (
            <HistoryView 
              history={history}
              toggleHistory={toggleHistory}
              useHistoryItem={useHistoryItem}
              clearHistory={() => setHistory([])}
            />
          ) : (
            <>
              {/* Calculator display showing current expression and history toggle */}
              <CalcDisplay 
                displayExpression={displayExpression}
                history={history}
                toggleHistory={toggleHistory}
                scrollViewRef={scrollViewRef}
              />
              {/* Calculator keypad with all buttons */}
              <KeypadView 
                handlePress={handlePress}
                handleClear={handleClear}
                handleBackspace={handleBackspace}
                handleCalculate={handleCalculate}
                handleToggleSign={handleToggleSign}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// Styles for the calculator container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c3e',   // Dark blue background
    justifyContent: 'flex-end',   // Position content at bottom
    paddingTop: StatusBar.currentHeight || 20  // Account for status bar height
  }
});

export default Calculator;