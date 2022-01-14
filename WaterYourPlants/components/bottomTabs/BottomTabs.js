import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const BottomTabs = ({currentScreen, setCurrentScreen, setAddReminderPopup}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setCurrentScreen('reminders');
        }}>
        <View style={styles.tabs}>
          <Text
            style={currentScreen === 'reminders' ? styles.activeTabText : null}>
            Reminders
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          setAddReminderPopup(true);
        }}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          setCurrentScreen('history');
        }}>
        <View style={styles.tabs}>
          <Text
            style={currentScreen === 'history' ? styles.activeTabText : null}>
            History
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '100%',
    backgroundColor: '#F0F3BD',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02c39a',
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
    bottom: 5,
    borderWidth: 8,
    borderColor: '#f0f3b8',
  },

  addButtonText: {
    color: '#f0f3b8',
    fontSize: 50,
  },

  tabs: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    margin: 25,
  },

  activeTabText: {
    color: '#02c39a',
  },
});

export default BottomTabs;
