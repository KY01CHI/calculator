import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HistoryView = ({ 
  history,          // Array of calculation history items
  toggleHistory,    // Function to toggle back to calculator view
  useHistoryItem,   // Function to use a history item as current expression
  clearHistory      // Function to clear all history
}) => {

  return (
    <SafeAreaView style={styles.historyFullScreen}>
      {/* Header with title and back button */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity style={styles.backButton} onPress={toggleHistory}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
      </View>
      
      {/* Scrollable history list or empty state */}
      <ScrollView 
        style={styles.historyScroll} 
        contentContainerStyle={history.length === 0 ? styles.emptyHistoryContainer : styles.historyScrollContent}
      >
        {history.length === 0 ? (
          // Empty state when no history items exist
          <View style={styles.noHistoryContainer}>
            <MaterialCommunityIcons name="calculator-variant" size={80} color="#4d5163" />
            <Text style={styles.noHistoryText}>No calculations yet</Text>
            <Text style={styles.noHistorySubtext}>Your calculation history will appear here</Text>
          </View>
        ) : (
          // Map through history items and render each one
          history.map((item, index) => {
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.historyItem}
                onPress={() => useHistoryItem(item)}
              >
                <View style={styles.historyItemContent}>
                  <View style={styles.historyTextContainer}>
                    <Text style={styles.historyExpression}>{item.expression}</Text>
                    <Text style={styles.historyResult}>= {item.result}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      
      {/* Footer with clear button if history exists */}
      <View style={styles.footerContainer}>
        {history.length > 0 && (
          <TouchableOpacity style={styles.historyClearButton} onPress={clearHistory}>
            <Feather name="trash-2" size={20} color="white" />
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

// Styles for the history view
const styles = StyleSheet.create({
  historyFullScreen: {
    flex: 1,                  // Take full screen
    backgroundColor: '#1e2130',  // Dark background
  },
  headerContainer: {
    flexDirection: 'row',     // Arrange horizontally
    alignItems: 'center',     // Center vertically
    justifyContent: 'space-between',  // Space between title and button
    paddingHorizontal: 16,    // Horizontal padding
    paddingVertical: 12,      // Vertical padding
    borderBottomWidth: 1,     // Bottom border
    borderBottomColor: '#3d4154',  // Border color
  },
  headerTitle: {
    color: 'white',           // White text
    fontSize: 24,             // Large font
    fontWeight: 'bold',       // Bold text
  },
  footerContainer: {
    borderTopWidth: 1,        // Top border
    borderTopColor: '#3d4154',  // Border color
    padding: 16,              // Padding
    alignItems: 'center',     // Center content horizontally
    backgroundColor: '#1e2130',  // Dark background
  },
  backButton: {
    flexDirection: 'row',     // Arrange horizontally
    alignItems: 'center',     // Center vertically
    backgroundColor: 'rgba(76, 217, 100, 0.2)',  // Semi-transparent green
    paddingVertical: 10,      // Vertical padding
    paddingHorizontal: 16,    // Horizontal padding
    borderRadius: 8,          // Rounded corners
  },
  headerText: {
    color: 'white',           // White text
    fontSize: 16,             // Medium font
    marginLeft: 8,            // Space after icon
  },
  historyScroll: {
    flex: 1,                  // Take remaining space
  },
  historyScrollContent: {
    paddingBottom: 16,        // Bottom padding
  },
  emptyHistoryContainer: {
    flexGrow: 1,              // Take all available space
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  historyItem: {
    paddingVertical: 16,      // Vertical padding
    paddingHorizontal: 6,     // Horizontal padding
    borderBottomWidth: 1,     // Bottom border
    borderBottomColor: '#3d4154',  // Border color
    marginHorizontal: 12,     // Horizontal margin
  },
  historyItemContent: {
    flexDirection: 'row',     // Arrange horizontally
    justifyContent: 'space-between',  // Space between content
    alignItems: 'center',     // Center vertically
  },
  historyTextContainer: {
    flex: 1,                  // Take remaining space
    paddingRight: 10,         // Right padding
  },
  historyExpression: {
    color: '#aaa',            // Light gray text
    fontSize: 16,             // Medium font
    textAlign: 'right',       // Right-aligned
    marginBottom: 4,          // Bottom margin
  },
  historyResult: {
    color: 'white',           // White text
    fontSize: 24,             // Large font
    textAlign: 'right',       // Right-aligned
    fontWeight: '500',        // Medium weight
  },
  operatorIconContainer: {
    width: 42,                // Fixed width
    height: 42,               // Fixed height
    borderRadius: 21,         // Circular
    alignItems: 'center',     // Center horizontally
    justifyContent: 'center', // Center vertically
    marginLeft: 12,           // Left margin
  },
  addOperator: {
    backgroundColor: 'rgba(76, 217, 100, 0.2)',  // Semi-transparent green
  },
  subtractOperator: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',   // Semi-transparent red
  },
  multiplyOperator: {
    backgroundColor: 'rgba(90, 200, 250, 0.2)',  // Semi-transparent blue
  },
  divideOperator: {
    backgroundColor: 'rgba(255, 204, 0, 0.2)',   // Semi-transparent yellow
  },
  operatorIcon: {
    color: '#4cd964',         // Green text
    fontSize: 26,             // Large font
    fontWeight: 'bold',       // Bold text
  },
  noHistoryContainer: {
    flex: 1,                  // Take all space
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    height: '100%',           // Full height
    paddingBottom: 50,        // Bottom padding
  },
  noHistoryText: {
    color: '#ddd',            // Light text
    textAlign: 'center',      // Center-aligned
    fontSize: 20,             // Large font
    fontWeight: '500',        // Medium weight
    marginTop: 16,            // Top margin
  },
  noHistorySubtext: {
    color: '#aaa',            // Lighter text
    textAlign: 'center',      // Center-aligned
    fontSize: 16,             // Medium font
    marginTop: 8,             // Top margin
  },
  historyClearButton: {
    flexDirection: 'row',     // Arrange horizontally
    alignItems: 'center',     // Center vertically
    justifyContent: 'center', // Center horizontally
    backgroundColor: 'rgba(255, 59, 48, 0.2)',  // Semi-transparent red
    paddingVertical: 15,      // Vertical padding
    paddingHorizontal: 30,    // Horizontal padding
    borderRadius: 8,          // Rounded corners
  },
  clearButtonText: {
    color: '#ff3b30',         // Red text
    marginLeft: 8,            // Left margin
    fontWeight: '500',        // Medium weight
    fontSize: 18,             // Large font
  }
});

export default HistoryView;