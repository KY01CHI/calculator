// File: src/hooks/useCalculator.js
import { useState } from 'react';

export const useCalculator = (scrollViewRef) => {
  const [displayExpression, setDisplayExpression] = useState('');
  const [calculationExpression, setCalculationExpression] = useState('');
  const [history, setHistory] = useState([]);
  const [isError, setIsError] = useState(false);

  // Input handler for calculator buttons
  const handlePress = (displayValue, calculationValue) => {
    const calcValue = calculationValue || displayValue;
    
    // If an error is showing, clear it before processing new input
    if (isError) {
      setDisplayExpression(displayValue);
      setCalculationExpression(calcValue);
      setIsError(false);
      return;
    }

    if(displayExpression === '0' && !isNaN(Number(displayValue)) && displayValue !== '.') {
      setDisplayExpression(displayValue);
      setCalculationExpression(calcValue);
    } else {
      setDisplayExpression((prev) => prev + displayValue);
      setCalculationExpression((prev) => prev + calcValue);
    }
  };

  const handleCalculate = () => {
    if (!calculationExpression) return;
    
    try {
      // Check for division by zero before evaluating
      if (calculationExpression.includes('/0')) {
        throw new Error;
      }
      const result = Function('"use strict";return (' + calculationExpression + ')')();
      const formattedResult = formatResult(result);
      let operator = '';
      if (calculationExpression.includes('+')) operator = '+';
      else if (calculationExpression.includes('-')) operator = '-';
      else if (calculationExpression.includes('*')) operator = '×';
      else if (calculationExpression.includes('/')) operator = '÷';
      
      setHistory(prev => [{
        expression: displayExpression,
        result: formattedResult,
        operator: operator
      }, ...prev.slice(0, 9)]);
      
      setDisplayExpression(formattedResult);
      setCalculationExpression(formattedResult);
    } catch (error) {
      // Set error state and display an appropriate error message
      if (String(error).includes('divide by zero')) {
        setDisplayExpression('Error: Cannot divide by zero');
      } else {
        setDisplayExpression('Error');
      }
      setIsError(true);
    }
  };

  const formatResult = (result) => {
    if (Number.isInteger(result)) {
      return result.toString();
    }
    return Number(result.toFixed(8)).toString();
  };

  const handleClear = () => {
    setDisplayExpression('');
    setCalculationExpression('');
    setIsError(false);
  };

  const handleBackspace = () => {
    // If an error is showing, clear it completely on backspace
    if (isError) {
      setDisplayExpression('');
      setCalculationExpression('');
      setIsError(false);
      return;
    }
    setDisplayExpression((prev) => prev.slice(0, -1));
    setCalculationExpression((prev) => prev.slice(0, -1));
  };

  const handleToggleSign = () => {
    if (!displayExpression) return;
    
    if (!isNaN(Number(displayExpression))) {
      if (displayExpression.startsWith('-')) {
        const toggled = displayExpression.slice(1);
        setDisplayExpression(toggled);
        setCalculationExpression(toggled);
      } else {
        const toggled = '-' + displayExpression;
        setDisplayExpression(toggled);
        setCalculationExpression(toggled);
      }
      return;
    }
    
    const tokens = displayExpression.split(/([\+\-×÷])/);
    let lastToken = tokens[tokens.length - 1];
    if (lastToken === '') return;
    
    if (!isNaN(Number(lastToken))) {
      if (lastToken.startsWith('-')) {
        lastToken = lastToken.slice(1);
      } else {
        lastToken = '-' + lastToken;
      }
      tokens[tokens.length - 1] = lastToken;
      const newDisplay = tokens.join('');
      const newCalc = newDisplay.replace(/×/g, '*').replace(/÷/g, '/');
      setDisplayExpression(newDisplay);
      setCalculationExpression(newCalc);
    }
  };

  return {
    displayExpression,
    calculationExpression,
    history,
    isError,
    handlePress,
    handleCalculate,
    handleClear,
    handleBackspace,
    handleToggleSign,
    setDisplayExpression,
    setCalculationExpression,
    setHistory,
    setIsError
  };
};