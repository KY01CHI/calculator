// File: src/components/HistoryView.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const HistoryView = ({ history, toggleHistory, useHistoryItem, clearHistory }) => {
  return (
    <SafeAreaView style={styles.historyFullScreen}>
      <ScrollView style={styles.historyScroll} contentContainerStyle={history.length === 0 ? styles.emptyHistoryContainer : undefined}>
        {history.length === 0 ? (
          <View style={styles.noHistoryContainer}>
            <Text style={styles.noHistoryText}>No calculations yet</Text>
          </View>
        ) : (
          history.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.historyItem}
              onPress={() => useHistoryItem(item)}
            >
              <View style={styles.historyItemContent}>
                <View style={styles.historyTextContainer}>
                  <Text style={styles.historyExpression}>{item.expression}</Text>
                  <Text style={styles.historyResult}>={item.result}</Text>
                </View>
                {item.operator && (
                  <View style={styles.operatorIconContainer}>
                    <Text style={styles.operatorIcon}>
                      {item.operator === '+' ? '＋' : item.operator === '-' ? '−' : item.operator === '*' || item.operator === '×' ? '×' : '÷'}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View style={styles.historyFooter}>
        <TouchableOpacity style={styles.historyBackButton} onPress={toggleHistory}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyClearButton} onPress={clearHistory}>
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  historyFullScreen: {
    flex: 1,
    backgroundColor: '#1e2130',
  },
  historyScroll: {
    flex: 1,
  },
  emptyHistoryContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyItem: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#3d4154',
  },
  historyItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  historyTextContainer: {
    flex: 1,
  },
  historyExpression: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'right',
  },
  historyResult: {
    color: 'white',
    fontSize: 22,
    textAlign: 'right',
  },
  operatorIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  operatorIcon: {
    color: '#4cd964',
    fontSize: 26,
    fontWeight: 'bold',
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noHistoryText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 18,
  },
  historyFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#3d4154',
    padding: 10,
    justifyContent: 'space-between',
  },
  historyBackButton: {
    padding: 10,
  },
  historyClearButton: {
    padding: 10,
  }
});

export default HistoryView;