import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { getShiftListsByGroupId } from '@apis/apis';
import { IShiftList } from '@interfaces/Shift';
import { getGroupId } from '@utils/globalUtils';
import moment from 'moment';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const getShiftLists = async (): Promise<IShiftList[]> => {
  const groupId = await getGroupId();
  if (groupId) {
    const shiftLists = await getShiftListsByGroupId({ groupId });
    console.log(shiftLists);
    return shiftLists;
  }
  return [];
};

const ShiftListsScreen = () => {
  const [shiftLists, setShiftLists] = useState<IShiftList[]>([]);

  useEffect(() => {
    const fetchShiftLists = async () => {
      const currentShiftLists: IShiftList[] = await getShiftLists();
      setShiftLists(currentShiftLists);
    };
    fetchShiftLists();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Shifts By Day</Text>
              </View>
              <View style={styles.sectionContent}>
                {shiftLists.map((shiftList) => {
                  return (
                    <View key={shiftList._id} style={styles.shiftList}>
                      <Text>{`${moment(shiftList.date).format(
                        'l',
                      )} Shifts`}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
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
    flexDirection: 'column',
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
  shiftList: {
    backgroundColor: Colors.lighter,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
  },
});

export default ShiftListsScreen;
