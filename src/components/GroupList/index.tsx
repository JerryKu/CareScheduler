import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IGroup } from '@interfaces/Group';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

const GroupList = ({ groupList }: { groupList: IGroup[] }) => {
  const setGroup = async (groupId: string) => {
    await AsyncStorage.setItem('groupId', groupId);
    Actions.home();
  };

  return (
    <>
      <View style={styles.groupListContainer}>
        <View style={styles.groupList}>
          {groupList.map((group: IGroup) => {
            return (
              <Text
                key={group._id}
                style={styles.group}
                onPress={() => setGroup(group._id)}>
                {group.groupName}
              </Text>
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  groupListContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  groupList: {
    display: 'flex',
    flexDirection: 'column',
  },
  group: {
    backgroundColor: Colors.lighter,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 5,
  },
});

export default GroupList;
