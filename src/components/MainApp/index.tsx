/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import HeaderBar from '@components/HeaderBar';
import NotesContainer from '@components/NotesContainer';

import { Colors } from 'react-native/Libraries/NewAppScreen';

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
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <HeaderBar />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Who's On Call</Text>
                <Text style={styles.sectionTitle}>{getCurrentDate()}</Text>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const getCurrentDate = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return month + '-' + day + '-' + year;
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
