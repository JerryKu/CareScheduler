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
} from 'react-native';
import HeaderBar from '@components/HeaderBar';
import NotesContainer from '@components/NotesContainer';
import AuthPage from '@components/AuthPage';
import { getUserId, getGroupId } from '@utils/globalUtils';
import _get from 'lodash/get';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux';
import { getGroupByGroupId, addNewShiftList } from '@apis/apis';

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

const handleAddNewShiftList = async () => {
  const groupId = await getGroupId();
  const date = getCurrentDate();
  if (groupId) {
    await addNewShiftList({ date, groupId });
    Actions.shiftLists();
  }
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [shiftLists, setShiftLists] = useState([]);
  const [currentShiftList, setCurrentShiftList] = useState({});

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
        if (currentGroup.groupName) {
          try {
            setGroupName(currentGroup.groupName);
            setShiftLists(currentGroup.shiftLists);
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
                      Actions.shiftLists()
                    }>{`${getCurrentDate()} Shifts`}</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionDescription}>Jerry Ku</Text>
                  <Text style={styles.sectionDescription}>7:30PM - 9PM</Text>
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Notes</Text>
                <View style={styles.sectionContent}>
                  <NotesContainer notes={notesArray} />
                </View>
              </View>
              <Button
                title="New Shift List"
                onPress={() => handleAddNewShiftList()}
              />
              <Button title="Groups" onPress={() => Actions.groups()} />
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
});

export default App;
