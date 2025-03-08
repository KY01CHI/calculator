// File: src/components/CalcDisplay.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const CalcDisplay = ({ displayExpression, history, toggleHistory, scrollViewRef }) => {
  return (
    <View style={styles.displayContainer}>
      {/* Top row with history icon */}
      <View style={styles.headerRow}>
        <View style={{flex: 1}}></View>
        <TouchableOpacity 
          style={styles.historyButton} 
          onPress={toggleHistory}
          activeOpacity={0.7}
        >
          <Entypo name="back-in-time" size={25} color="#ff9d42" />
          {history.length > 0 && (
            <View style={styles.historyBadge}>
              <Text style={styles.historyBadgeText}>
                {history.length > 9 ? '9+' : history.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Main display area for calculation */}
      <View style={styles.inputContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.displayText}>
            {displayExpression || "0"}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    padding: 30,
    marginBottom: 15,
    backgroundColor: '#1e2130',
    borderRadius: 16,
    margin: 12,
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
    height: 40,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  displayText: {
    color: 'white',
    fontSize: 36,
    fontWeight: '300',
    textAlign: 'right',
    width: '100%',
  },
  historyButton: {
    padding: 8,
    position: 'relative',
  },
  historyBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  historyBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default CalcDisplay;