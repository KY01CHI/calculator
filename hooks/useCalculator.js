// hooks/useCalculator.js
import { useState, useEffect } from 'react';

export const useCalculator = (scrollViewRef) => {
  const [displayExpression, setDisplayExpression] = useState('');
  const [calculationExpression, setCalculationExpression] = useState('');
  const [history, setHistory] = useState([]);
  const [isError, setIsError] = useState(false);
  const [lastOperation, setLastOperation] = useState(null);

  // Clear all calculator state
  const handleClear = () => {
    setDisplayExpression('');
    setCalculationExpression('');
    setIsError(false);
    setLastOperation(null);
  };

  // Handle backspace/delete
  const handleBackspace = () => {
    if (isError) {
      setIsError(false);
      setDisplayExpression('');
      setCalculationExpression('');
      return;
    }

    if (displayExpression.length > 0) {
      const newDisplay = displayExpression.slice(0, -1);
      setDisplayExpression(newDisplay);

      // Also update calculation expression
      if (calculationExpression.length > 0) {
        const lastChar = calculationExpression.slice(-1);
        // Handle special cases like ÷ → / and × → *
        if (
          (lastChar === '/' && displayExpression.slice(-1) === '÷') || 
          (lastChar === '*' && displayExpression.slice(-1) === '×')
        ) {
          setCalculationExpression(calculationExpression.slice(0, -1));
        } else {
          setCalculationExpression(calculationExpression.slice(0, -1));
        }
      }
    }
  };

  // Handle numeric and operator inputs
  const handlePress = (text, calcText) => {
    if (isError) {
      setIsError(false);
      setDisplayExpression(text);
      setCalculationExpression(calcText || text);
      return;
    }

    // Handle operators
    if (['+', '-', '×', '÷'].includes(text)) {
      // Don't allow operators at the start except minus
      if (displayExpression === '' && text !== '-') {
        return;
      }
      
      // Don't allow consecutive operators except if adding a minus after another operator
      const lastChar = displayExpression.slice(-1);
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        if (text === '-' && lastChar !== '-') {
          // Allow minus after another operator (for negative numbers)
          setDisplayExpression(prev => prev + text);
          setCalculationExpression(prev => prev + (calcText || text));
        } else {
          // Replace last operator with new one
          setDisplayExpression(prev => prev.slice(0, -1) + text);
          setCalculationExpression(prev => {
            // Handle special cases for calculation expression
            if (prev.slice(-1) === '*' || prev.slice(-1) === '/') {
              return prev.slice(0, -1) + (calcText || text);
            } else {
              return prev.slice(0, -1) + (calcText || text);
            }
          });
        }
        return;
      }
    }

    // Handle decimal point
    if (text === '.') {
      // Find the last number in the expression
      const parts = displayExpression.split(/[+\-×÷]/);
      const lastPart = parts[parts.length - 1];
      
      // Check if the last number already has a decimal point
      if (lastPart && lastPart.includes('.')) {
        return;
      }
      
      // If expression is empty, add "0." instead of just "."
      if (displayExpression === '') {
        setDisplayExpression('0.');
        setCalculationExpression('0.');
        return;
      }
    }

    setDisplayExpression(prev => prev + text);
    setCalculationExpression(prev => prev + (calcText || text));
  };

  // Handle toggle sign (+/-)
  const handleToggleSign = () => {
    // If expression is empty, do nothing
    if (displayExpression === '') return;
    
    // Check if the expression has operators
    const hasOperators = /[+\-×÷*/]/.test(displayExpression);
    
    if (!hasOperators) {
      // Simple case: just a single number
      // If negative, remove the minus sign
      // If positive, add a minus sign (never add a plus sign)
      if (displayExpression.startsWith('-')) {
        setDisplayExpression(displayExpression.substring(1));
        setCalculationExpression(calculationExpression.substring(1));
      } else {
        setDisplayExpression(`-${displayExpression}`);
        setCalculationExpression(`-${calculationExpression}`);
      }
    } else {
      // Complex case: expression with operators
      const operators = ['+', '-', '×', '÷', '*', '/'];
      let lastOperatorIndex = -1;
      let lastOperator = '';
      
      // Find the last operator position
      for (let i = displayExpression.length - 1; i >= 0; i--) {
        if (operators.includes(displayExpression[i])) {
          // Skip if it's a negative sign after another operator
          if (displayExpression[i] === '-' && i > 0 && operators.includes(displayExpression[i-1])) {
            continue;
          }
          lastOperatorIndex = i;
          lastOperator = displayExpression[i];
          break;
        }
      }
      
      if (lastOperatorIndex !== -1) {
        const beforeOperator = displayExpression.substring(0, lastOperatorIndex);
        const afterOperator = displayExpression.substring(lastOperatorIndex + 1);
        
        // If there's a number after the operator
        if (afterOperator.length > 0) {
          if (lastOperator === '-') {
            // If last operator is minus, just remove it (don't add a plus sign)
            setDisplayExpression(`${beforeOperator}${afterOperator}`);
            
            // Also update calculation expression
            const calcLastOpIndex = calculationExpression.lastIndexOf('-');
            if (calcLastOpIndex !== -1) {
              const calcBeforeOp = calculationExpression.substring(0, calcLastOpIndex);
              const calcAfterOp = calculationExpression.substring(calcLastOpIndex + 1);
              setCalculationExpression(`${calcBeforeOp}${calcAfterOp}`);
            }
          } else if (lastOperator === '+') {
            // If last operator is plus, replace it with minus
            setDisplayExpression(`${beforeOperator}-${afterOperator}`);
            
            // Also update calculation expression
            const calcLastOpIndex = calculationExpression.lastIndexOf('+');
            if (calcLastOpIndex !== -1) {
              const calcBeforeOp = calculationExpression.substring(0, calcLastOpIndex);
              const calcAfterOp = calculationExpression.substring(calcLastOpIndex + 1);
              setCalculationExpression(`${calcBeforeOp}-${calcAfterOp}`);
            }
          } else {
            // For × or ÷, toggle the sign of the number after the operator
            if (afterOperator.startsWith('-')) {
              setDisplayExpression(`${beforeOperator}${lastOperator}${afterOperator.substring(1)}`);
              
              // Handle calculation expression - first translate display operator to calc operator
              const calcOperator = lastOperator === '×' ? '*' : lastOperator === '÷' ? '/' : lastOperator;
              const calcLastOpIndex = calculationExpression.lastIndexOf(calcOperator);
              
              if (calcLastOpIndex !== -1 && calculationExpression[calcLastOpIndex + 1] === '-') {
                const calcBeforeOp = calculationExpression.substring(0, calcLastOpIndex + 1);
                const calcAfterOp = calculationExpression.substring(calcLastOpIndex + 2);
                setCalculationExpression(`${calcBeforeOp}${calcAfterOp}`);
              }
            } else {
              setDisplayExpression(`${beforeOperator}${lastOperator}-${afterOperator}`);
              
              // Handle calculation expression
              const calcOperator = lastOperator === '×' ? '*' : lastOperator === '÷' ? '/' : lastOperator;
              const calcLastOpIndex = calculationExpression.lastIndexOf(calcOperator);
              
              if (calcLastOpIndex !== -1) {
                const calcBeforeOp = calculationExpression.substring(0, calcLastOpIndex + 1);
                const calcAfterOp = calculationExpression.substring(calcLastOpIndex + 1);
                setCalculationExpression(`${calcBeforeOp}-${calcAfterOp}`);
              }
            }
          }
        }
      }
    }
  };

  // Calculate the final result
  const handleCalculate = () => {
    if (displayExpression === '' || isError) return;
    
    try {
      // Prevent trailing operators
      let expression = calculationExpression;
      while (['+', '-', '*', '/', '×', '÷'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
      }
      
      // If the expression is empty after cleaning, do nothing
      if (expression === '') return;
      
      // Evaluate the expression
      const result = eval(expression).toString();
      
      // Check for division by zero or other errors
      if (result === 'Infinity' || result === '-Infinity' || result === 'NaN') {
        setIsError(true);
        setDisplayExpression('Error');
        return;
      }
      
      // Add to history
      const historyItem = {
        expression: displayExpression,
        result: result
      };
      
      setHistory(prev => [historyItem, ...prev]);
      
      // Update display with result
      setDisplayExpression(result);
      setCalculationExpression(result);
      
      // Save the last operation
      const lastChar = displayExpression.slice(-1);
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        setLastOperation({
          operator: lastChar,
          calcOperator: lastChar === '×' ? '*' : lastChar === '÷' ? '/' : lastChar,
          operand: displayExpression.slice(0, -1)
        });
      }
    } catch (error) {
      setIsError(true);
      setDisplayExpression('Error');
    }
  };

  // Return all the state and functions
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
    setHistory,
    setDisplayExpression,
    setCalculationExpression,
    setIsError
  };
};