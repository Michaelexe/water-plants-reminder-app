import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RemindersPage = () => {
  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>All Reminders</Text>
      </View>
      <View style={styles.reminderCards}>
        <Text>idk</Text>
      </View>
      <View style={styles.reminderCards}></View>
      <View style={styles.reminderCards}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 2,
    borderColor: '#02C39A',
  },

  topBarText: {
    color: '#02C39A',
    fontSize: 40,
    fontWeight: '700',
  },

  reminderCards: {
    flexDirection: 'row',
    backgroundColor: '#00A896',
    height: 100,
    borderBottomWidth: 2,
    borderColor: '#02C39A',
  },
});

export default RemindersPage;
