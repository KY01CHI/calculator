// app/tabs/Calculator.tsx
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
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const scrollViewRef = useRef<any>(null);
  
  const { 
    displayExpression,
    calculationExpression,
    history,
    isError,
    handlePress, 
    handleCalculate, 
    handleClear, 
    handleBackspace,
    handleToggleSign,
    setHistory,
    setDisplayExpression,
    setCalculationExpression,
    setIsError
  } = useCalculator(scrollViewRef);

  // Auto-scroll to bottom when display changes
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [displayExpression]);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const useHistoryItem = (item: {expression: string, result: string}) => {
    setDisplayExpression(item.result);
    setCalculationExpression(item.result);
    setShowHistory(false);
    setIsError(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {showHistory ? (
            <HistoryView 
              history={history}
              toggleHistory={toggleHistory}
              useHistoryItem={useHistoryItem}
              clearHistory={() => setHistory([])}
            />
          ) : (
            <>
              <CalcDisplay 
                displayExpression={displayExpression}
                history={history}
                toggleHistory={toggleHistory}
                scrollViewRef={scrollViewRef}
              />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c3e',
    justifyContent: 'flex-end',
    paddingTop: StatusBar.currentHeight || 20
  }
});

export default Calculator;