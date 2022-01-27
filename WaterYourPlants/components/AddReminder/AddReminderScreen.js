import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight,
  Button,
  Pressable,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import plants from '../../assets/plants.js';

const AddReminderScreen = ({setAddReminderPopup}) => {
  const [selectedPlant, setSelectedPlant] = useState();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const showPopup = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onChangeHandler = (event, newDate) => {
    const currentDate = newDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const submitHandler = async () => {
    try {
      const currentState = await AsyncStorage.getItem('reminders');
      const currentStateParsed = JSON.parse(currentState);
      const value = {
        plantName: selectedPlant.name,
        plantTime: selectedPlant.timing,
        date: date,
      };
      if (currentState !== null) {
        await AsyncStorage.setItem(
          'reminders',
          JSON.stringify({list: [...currentStateParsed.list, value]}),
        );
      } else {
        await AsyncStorage.setItem(
          'reminders',
          JSON.stringify({list: [value]}),
        );
      }
      await setAddReminderPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <TouchableWithoutFeedback
            onPress={() => {
              setAddReminderPopup(false);
            }}>
            <Image
              source={require('./assets/backIcon.png')}
              style={styles.topBarImage}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.topBarText}>Add Reminder</Text>
        </View>
        <View style={{marginVertical: 15, paddingHorizontal: 5}}>
          <Text style={styles.headers}>Choose your plant:</Text>
          <View style={{height: 250, marginVertical: 5}}>
            <ScrollView>
              {plants.map(plant => {
                return (
                  <TouchableHighlight
                    onPress={() => {
                      setSelectedPlant(plant);
                    }}
                    key={plant.name}>
                    <View style={styles.plantCards}>
                      <Image source={plant.image} style={styles.plantImage} />
                      <View>
                        <Text style={styles.plantText}>{plant.name}</Text>
                        <Text style={styles.plantTime}>
                          How often: every {plant.timing} hours
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </ScrollView>
          </View>
          {selectedPlant ? (
            <View>
              <Text style={{...styles.headers, marginTop: 30}}>
                Selected Plant:
              </Text>
              <View style={styles.plantCards}>
                <Image source={selectedPlant.image} style={styles.plantImage} />
                <View>
                  <Text style={styles.plantText}>{selectedPlant.name}</Text>
                  <Text style={styles.plantTime}>
                    How often: every {selectedPlant.timing} hours
                  </Text>
                </View>
              </View>
              <Text style={{...styles.headers, marginTop: 30}}>
                Select a date for when to start reminding:
              </Text>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Pressable
                  onPress={() => {
                    showPopup('data');
                  }}
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  <LinearGradient
                    colors={['#05668D', '#00A896']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.normalButtons}>
                    <Text style={styles.buttonText}>Choose Date</Text>
                  </LinearGradient>
                  <Text style={styles.currentlySetText}>
                    Currently at {date.getDate()}/{date.getMonth() + 1}/
                    {date.getFullYear()}
                  </Text>
                </Pressable>
              </View>
              <Text style={{...styles.headers, marginTop: 30}}>
                Select a time for when to start reminding:
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 70,
                }}>
                <Pressable
                  onPress={() => {
                    showPopup('time');
                  }}
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  <LinearGradient
                    colors={['#05668D', '#00A896']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.normalButtons}>
                    <Text style={styles.buttonText}>Choose Time</Text>
                  </LinearGradient>
                  <Text style={styles.currentlySetText}>
                    Currently set as {date.getHours()}:
                    {date.getMinutes() < 10
                      ? '0' + date.getMinutes()
                      : date.getMinutes()}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
        {show ? (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={(event, newDate) => {
              onChangeHandler(event, newDate);
            }}
          />
        ) : null}
      </ScrollView>
      {selectedPlant ? (
        <View style={styles.submitButtonContainer}>
          <Pressable onPress={submitHandler}>
            <LinearGradient
              colors={['#00A896', '#02C39A']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.submitButton}>
              <Text style={styles.buttonText}>Add Reminder</Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F3BD',
    position: 'absolute',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  topBarImage: {
    height: 35,
    width: 35,
    position: 'absolute',
    top: 8,
    left: 5,
  },

  topBarText: {
    color: '#02C39A',
    fontWeight: '700',
    fontSize: 30,
  },

  headers: {
    fontSize: 25,
    fontWeight: '600',
    paddingHorizontal: 5,
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

  normalButtons: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#028090',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 10,
  },

  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#02C39A',
    borderRadius: 100,
  },

  submitButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#028090',
    width: '100%',
    height: 60,
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
  },

  currentlySetText: {
    fontSize: 20,
    marginTop: 5,
  },
});

export default AddReminderScreen;
