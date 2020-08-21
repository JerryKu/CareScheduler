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
import ShiftsContainer from '@components/ShiftsContainer';
import AuthPage from '@components/AuthPage';
import NewShiftModal from '@components/NewShiftModal';
import CalendarPicker from 'react-native-calendar-picker';
import moment, { Moment } from 'moment';
import { getUserId, getGroupId, getShiftListId } from '@utils/globalUtils';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux';
import {
  getGroupByGroupIdApi,
  addNewShiftListApi,
  getShiftListByGroupIdAndDateApi,
} from '@apis/apis';
import _isEmpty from 'lodash/isEmpty';
import AsyncStorage from '@react-native-community/async-storage';

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

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNewShiftModal, setShowNewShiftModal] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(moment().format('l'));
  const [updateShiftListFlag, setUpdateShiftListFlag] = useState(false);

  const handleAddNewShift = async () => {
    setShowNewShiftModal(true);
  };

  const handleDateChange = async (e: Moment) => {
    const newCurrentDate = moment(e).format('l');
    const groupId = await getGroupId();
    if (groupId) {
      const selectedShiftList = await getShiftListByGroupIdAndDateApi({
        groupId,
        date: newCurrentDate,
      });
      if (!_isEmpty(selectedShiftList)) {
        await AsyncStorage.setItem('shiftListId', selectedShiftList._id);
        setUpdateShiftListFlag(true);
      } else {
        const newShiftList = await addNewShiftListApi({
          date: newCurrentDate,
          groupId,
        });
        await AsyncStorage.setItem('shiftListId', newShiftList._id);
        setUpdateShiftListFlag(true);
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
        const currentGroup = await getGroupByGroupIdApi({ groupId });
        if (!_isEmpty(currentGroup)) {
          try {
            setGroupName(currentGroup.groupName);
          } catch (e) {
            console.log(e);
          }
        }
        getInitialShiftList();
      } else {
        Actions.group();
      }
    };

    const getInitialShiftList = async () => {
      const todaysDate = moment().format('l');
      const selectedShiftList = await getShiftListId();
      const groupId = await getGroupId();
      if (!selectedShiftList && groupId) {
        const todaysShiftList = await getShiftListByGroupIdAndDateApi({
          groupId,
          date: todaysDate,
        });
        if (!_isEmpty(todaysShiftList)) {
          await AsyncStorage.setItem('shiftListId', todaysShiftList._id);
          setUpdateShiftListFlag(true);
        } else {
          const newShiftList = await addNewShiftListApi({
            date: todaysDate,
            groupId,
          });
          await AsyncStorage.setItem('shiftListId', newShiftList._id);
          setUpdateShiftListFlag(true);
        }
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
                  <Text style={styles.sectionTitle}>Group: </Text>
                  <Text style={styles.sectionTitle}>{groupName}</Text>
                </View>
                <View style={styles.sectionHeader}>
                  <Text
                    style={styles.dateSelector}
                    onPress={() =>
                      setShowCalendar(true)
                    }>{`${currentDate}`}</Text>
                </View>
                <Text style={styles.sectionTitle}>Shifts</Text>
                <View style={styles.sectionContent}>
                  <ShiftsContainer
                    updateShiftListFlag={updateShiftListFlag}
                    setUpdateShiftListFlag={setUpdateShiftListFlag}
                  />
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
                  visible={showCalendar}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <CalendarPicker onDateChange={handleDateChange} />
                    </View>
                  </View>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={showNewShiftModal}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <NewShiftModal
                        setShowNewShiftModal={setShowNewShiftModal}
                        setUpdateShiftListFlag={setUpdateShiftListFlag}
                      />
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
    justifyContent: 'space-between',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateSelector: {
    textDecorationLine: 'underline',
    fontSize: 20,
    marginBottom: 10,
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
    marginTop: 100,
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
