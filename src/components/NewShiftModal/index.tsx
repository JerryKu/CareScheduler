import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import moment from 'moment';
import { IUser } from '@interfaces/User';
import { getUsersInGroupApi, addNewShiftApi } from '@apis/apis';
import { getGroupId, getShiftListId } from '@utils/globalUtils';

const NewShiftModalContent = ({
  setShowNewShiftModal,
}: {
  setShowNewShiftModal: Function;
}) => {
  const [startDate, setStartDate] = useState(new Date(moment().format()));
  const [endDate, setEndDate] = useState(new Date(moment().format()));
  const [groupUsers, setGroupUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState<string | number>();

  useEffect(() => {
    const getUsers = async () => {
      const groupId = await getGroupId();
      if (groupId) {
        const groupUsersResponse = await getUsersInGroupApi({ groupId });
        setGroupUsers(groupUsersResponse);
      }
    };
    getUsers();
  }, []);

  const addNewShift = async () => {
    try {
      const shiftListId = await getShiftListId();
      if (shiftListId) {
        await addNewShiftApi(shiftListId, {
          startTime: startDate,
          endTime: endDate,
          assigned: assignedUser,
        });
        setShowNewShiftModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.newShiftModalContent}>
      <Text style={styles.closeButton}>X</Text>
      <View>
        <Text style={styles.formHeader}>Assigned to: </Text>
        <Picker
          style={styles.picker}
          selectedValue={assignedUser}
          onValueChange={(itemValue) => {
            setAssignedUser(itemValue);
          }}>
          <Picker.Item key="None" label="No One" value="" />
          {groupUsers.map((user: IUser) => {
            return (
              <Picker.Item
                key={user._id}
                label={`${user.firstName} ${user.lastName}`}
                value={user._id}
              />
            );
          })}
        </Picker>
      </View>
      <View>
        <Text style={styles.formHeader}>Start Time: </Text>
        <DateTimePicker
          style={styles.timePicker}
          display={'default'}
          value={startDate}
          mode={'time'}
          onChange={(e, selectedDate) => {
            const currentDate = selectedDate || startDate;
            setStartDate(currentDate);
          }}
        />
      </View>
      <View>
        <Text style={styles.formHeader}>End Time: </Text>
        <DateTimePicker
          style={styles.timePicker}
          display={'default'}
          value={endDate}
          mode={'time'}
          onChange={(e, selectedDate) => {
            const currentDate = selectedDate || endDate;
            setEndDate(currentDate);
          }}
        />
      </View>
      <Button
        title="Add New Shift"
        onPress={() => {
          addNewShift();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  newShiftModalContent: {
    width: 200,
    position: 'relative',
  },
  formHeader: {
    fontSize: 20,
  },
  timePicker: {
    height: 120,
  },
  picker: {},
  closeButton: {
    top: 0,
    right: 0,
    fontSize: 20,
    position: 'absolute',
  },
});

export default NewShiftModalContent;
