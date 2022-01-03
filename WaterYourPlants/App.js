import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import BottomTabs from './components/bottomTabs/BottomTabs';
import RemindersPage from './components/remindersPage/RemindersPage';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('reminders');
  return (
    <SafeAreaView style={bodyStyles.body}>
      <ScrollView style={bodyStyles.scrollView}>
        {currentScreen === 'reminders' ? <RemindersPage /> : null}
      </ScrollView>
      <BottomTabs
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </SafeAreaView>
  );
};

const bodyStyles = StyleSheet.create({
  body: {
    backgroundColor: '#029090',
    height: '100%',
  },

  scrollView: {
    marginBottom: 80,
  },
});

export default App;
