import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Calculator: React.FC = () => {
    const [displayExpression, setDisplayExpression] = useState('');
    const [calculationExpression, setCalculationExpression] = useState('');

    const handlePress = (displayValue: string, calculationValue?: string) => {
        //Convert display operators to Javascript operators
        const calcValue = calculationValue || displayValue;


        if(displayExpression === '0' && !isNaN(Number(displayValue)) && displayValue !== '.') {
            setDisplayExpression(displayValue);
            setCalculationExpression(calcValue);
        } else {
            setDisplayExpression((prev) => prev + displayValue);
            setCalculationExpression((prev) => prev + calcValue);
        }
    };

    const handleCalculate = () => {
        try {
            const result = eval(calculationExpression);
            setDisplayExpression(String(result));
            setCalculationExpression(String(result));
            } catch (error) {
                setDisplayExpression('Error');
                setCalculationExpression('');
        }
    };
    

    // clear all input numbers
    const handleClear = () => {
        setDisplayExpression('');
        setCalculationExpression('');
    };

    const handleBackspace = () => {
        setDisplayExpression((prev) => prev.slice(0, -1));
        setCalculationExpression((prev) => prev.slice(0, -1));
    }

    return (
        <View style={styles.container}>
            <View style={styles.displayContainer}>
                <Text style={styles.displayText}>{displayExpression || '0'}</Text>
            </View>

            {/* Row: 1 */}
            <View style={styles.row}>
                <CalcButton text="7" onPress={() => handlePress('7')} />
                <CalcButton text="8" onPress={() => handlePress('8')} />
                <CalcButton text="9" onPress={() => handlePress('9')} />
                <CalcButton text="÷" onPress={() => handlePress('÷', '/')} isOperator />
            </View>

            {/* Row: 2 */}
            <View style={styles.row}>
                <CalcButton text="4" onPress={() => handlePress('4')} />
                <CalcButton text="5" onPress={() => handlePress('5')} />
                <CalcButton text="6" onPress={() => handlePress('6')} />
                <CalcButton text="×" onPress={() => handlePress('×', '*')} isOperator />
            </View>
            
            {/* Row: 3 */}
            <View style={styles.row}>
                <CalcButton text="1" onPress={() => handlePress('1')} />
                <CalcButton text="2" onPress={() => handlePress('2')} />
                <CalcButton text="3" onPress={() => handlePress('3')} />
                <CalcButton text="-" onPress={() => handlePress('-')} isOperator />
            </View>

            {/* Row: 4 */}
            <View style={styles.row}>
                <CalcButton text="." onPress={() => handlePress('.')} />
                <CalcButton text="0" onPress={() => handlePress('0')} />
                <CalcButton text="⌫" onPress={handleBackspace} isOperator />
                <CalcButton text="+" onPress={() => handlePress('+')} isOperator />
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
                    <Text style={styles.buttonText}>A/C</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.equalsButton]} onPress={handleCalculate}>
                    <Text style={styles.buttonText} >=</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

{/* Button Component */}
interface CalcButtonProps {
    text: string;
    onPress: () => void;
    isOperator?: boolean;
}

const CalcButton: React.FC<CalcButtonProps> = ({ text, onPress, isOperator}) => {
    return (
        <TouchableOpacity
            style={[styles.button, isOperator ? styles.operatorButton : null]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#222831',
        justifyContent: 'flex-end',
    },
    displayContainer: {
        padding: 20,
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    displayText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    button: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        margin: 4,
    },
    operatorButton: {
        backgroundColor: '#00ADB5',
        color: '#fff',
    },
    equalsButton: {
        backgroundColor: '#5cb85c',
        flex: 1,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#ef5350',
        flex: 2,
        marginRight: 5,
    }
})

export default Calculator;