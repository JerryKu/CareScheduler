import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { getUsersGroupListByUserIdApi } from '@apis/apis';
import { getUserId } from '@utils/globalUtils';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import GroupList from '@components/GroupList';

const getGroupList = async () => {
  const userId = await getUserId();
  const groupsList = await getUsersGroupListByUserIdApi({ userId });
  return groupsList;
};

const GroupScreen = () => {
  const [groupsOwned, setGroupsOwned] = useState([]);
  const [groupsMemberOf, setGroupsMemberOf] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await getGroupList();
      setGroupsMemberOf(groups.groupsMemberOf);
      setGroupsOwned(groups.groupsOwned);
    };
    fetchGroups();
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
                <Text style={styles.sectionTitle}>Groups</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Groups I Own</Text>
                <GroupList groupList={groupsOwned} />
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>Groups I'm a Part Of</Text>
                <GroupList groupList={groupsMemberOf} />
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
});

export default GroupScreen;
