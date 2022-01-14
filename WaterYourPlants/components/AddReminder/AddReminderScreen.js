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
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import plants from '../../index.js';

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
                <Button
                  title="Choose Date"
                  onPress={() => {
                    showPopup('data');
                  }}
                />
              </View>
              <Text style={{...styles.headers, marginTop: 30}}>
                Select a time for when to start reminding:
              </Text>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  title="Choose Time"
                  onPress={() => {
                    showPopup('time');
                  }}
                />
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
});

export default AddReminderScreen;
