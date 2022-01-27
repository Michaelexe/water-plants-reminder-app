import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import plants from '../../assets/plants.js';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);

  const getReminders = async () => {
    try {
      const allReminders = await AsyncStorage.getItem('reminders');
      console.log(allReminders);
      setReminders(JSON.parse(allReminders).list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

  const deleteHandler = async reminder => {
    try {
      const newReminder = reminders.filter(current => {
        return current !== reminder;
      });
      setReminders(newReminder);
      await AsyncStorage.setItem(
        'reminders',
        JSON.stringify({list: newReminder}),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>All Reminders</Text>
      </View>
      {reminders.map(reminder => {
        const date = new Date(Date.parse(reminder.date));
        return (
          <View style={styles.plantCards} key={reminders.indexOf(reminder)}>
            <Image
              source={
                plants.find(plant => plant.name === reminder.plantName).image
              }
              style={styles.plantImage}
            />
            <View>
              <Text style={styles.plantText}>{reminder.plantName}</Text>
              <Text style={styles.plantTime}>
                How often: every {reminder.plantTime} hours
              </Text>
              <Text style={styles.reminderDateText}>
                Next reminder on {date.getHours()}:
                {date.getMinutes() < 10
                  ? '0' + date.getMinutes()
                  : date.getMinutes()}
                , {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </Text>
            </View>
            <Pressable
              style={{position: 'absolute', right: 5}}
              onPress={() => {
                deleteHandler(reminder);
              }}>
              <Image
                source={require('./assets/deleteIcon.png')}
                style={styles.deleteIcon}></Image>
            </Pressable>
          </View>
        );
      })}
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

  plantCards: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A896',
    height: 90,
    borderBottomWidth: 2,
    borderColor: '#02C39A',
    padding: 5,
  },

  plantText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
  },

  plantImage: {
    height: 80,
    width: 80,
    marginRight: 10,
  },

  plantTime: {
    color: 'white',
    fontWeight: '500',
  },

  deleteIcon: {
    width: 60,
    height: 60,
  },

  reminderDateText: {
    color: 'white',
  },
});

export default RemindersPage;
