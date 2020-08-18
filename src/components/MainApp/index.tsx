/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Modal,
} from 'react-native';
import HeaderBar from '@components/HeaderBar';
import NotesContainer from '@components/NotesContainer';
import AuthPage from '@components/AuthPage';
import CalendarPicker from 'react-native-calendar-picker';
import moment, { Moment } from 'moment';
import { getUserId, getGroupId } from '@utils/globalUtils';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux';
import {
  getGroupByGroupId,
  addNewShiftList,
  getShiftListByGroupIdAndDate,
} from '@apis/apis';
import _isEmpty from 'lodash/isEmpty';

const notesArray = [
  {
    checked: false,
    text: 'Give medicine',
    isEditing: false,
  },
  {
    checked: false,
    text: 'Bathroom',
    isEditing: false,
  },
];

const getCurrentDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return month + '-' + day + '-' + year;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [currentShiftList, setCurrentShiftList] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment().format('l'));

  const handleAddNewShift = async () => {
    const groupId = await getGroupId();
    const date = moment().format('l');
    if (groupId) {
      // TODO: add new shift
      await addNewShiftList({ date, groupId });
    }
    // TODO: new shift modal
  };

  const handleDateChange = async (e: Moment) => {
    const newCurrentDate = moment(e).format('l');
    const groupId = await getGroupId();
    if (groupId) {
      const selectedShiftList = await getShiftListByGroupIdAndDate({
        groupId,
        date: newCurrentDate,
      });
      if (!_isEmpty(selectedShiftList)) {
        setCurrentShiftList(selectedShiftList.shifts);
      } else {
        const newShiftList = await addNewShiftList({
          date: newCurrentDate,
          groupId,
        });
        setCurrentShiftList(newShiftList.shifts);
      }
    }
    setCurrentDate(newCurrentDate);
    setShowCalendar(false);
  };

  useEffect(() => {
    const loggedInCheck = async () => {
      const user = await getUserId();
      setLoggedIn(!!user);
    };
    loggedInCheck();
  }, []);

  useEffect(() => {
    const getGroupObject = async () => {
      const groupId = await getGroupId();
      if (groupId) {
        const currentGroup = await getGroupByGroupId({ groupId });
        if (!_isEmpty(currentGroup)) {
          try {
            setGroupName(currentGroup.groupName);
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        Actions.group();
      }
    };
    getGroupObject();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <HeaderBar />
          {loggedIn ? (
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{groupName}</Text>
                </View>
                <View style={styles.sectionHeader}>
                  <Text
                    style={styles.sectionTitle}
                    onPress={() =>
                      setShowCalendar(true)
                    }>{`${currentDate}`}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionDescription}>Jerry Ku</Text>
                  <Text style={styles.sectionDescription}>7:30PM - 9PM</Text>
                </View>
                <Button title="New Shift" onPress={() => handleAddNewShift()} />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Notes</Text>
                <View style={styles.sectionContent}>
                  <NotesContainer notes={notesArray} />
                </View>
              </View>
              <Button title="Groups" onPress={() => Actions.groups()} />
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={showCalendar}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <CalendarPicker onDateChange={handleDateChange} />
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          ) : (
            <AuthPage setLoggedIn={setLoggedIn} />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 26,
    paddingHorizontal: 24,
  },
  sectionContent: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '50%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;
