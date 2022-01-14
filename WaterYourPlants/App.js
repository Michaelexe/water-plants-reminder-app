import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import AddReminderScreen from './components/AddReminder/AddReminderScreen';
import BottomTabs from './components/bottomTabs/BottomTabs';
import RemindersPage from './components/remindersPage/RemindersPage';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('reminders');
  const [addReminderPopup, setAddReminderPopup] = useState(false);
  return (
    <SafeAreaView style={bodyStyles.body}>
      <ScrollView style={bodyStyles.scrollView}>
        {currentScreen === 'reminders' ? <RemindersPage /> : null}
      </ScrollView>
      <BottomTabs
        setAddReminderPopup={setAddReminderPopup}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
      {addReminderPopup ? (
        <AddReminderScreen setAddReminderPopup={setAddReminderPopup} />
      ) : null}
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
