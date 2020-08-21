import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import { IUser } from '@interfaces/User';
import { getUsersInGroupApi, updateShiftApi } from '@apis/apis';
import { getGroupId } from '@utils/globalUtils';
import { IShift } from '@interfaces/Shift';

const EditShiftModalContent = ({
  setShowEditShiftModal,
  setUpdateShiftListFlag,
  editShiftState,
}: {
  setShowEditShiftModal: Function;
  setUpdateShiftListFlag: Function;
  editShiftState: IShift;
}) => {
  const { startTime, endTime, assigned, _id } = editShiftState;
  const [startDate, setStartDate] = useState(new Date(startTime));
  const [endDate, setEndDate] = useState(new Date(endTime));
  const [groupUsers, setGroupUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState<string | number>();

  useEffect(() => {
    const getUsers = async () => {
      const groupId = await getGroupId();
      if (groupId) {
        const groupUsersResponse = await getUsersInGroupApi({ groupId });
        setGroupUsers(groupUsersResponse);
        setAssignedUser(assigned);
      }
    };
    getUsers();
  }, [assigned]);

  const saveChanges = async () => {
    try {
      if (_id) {
        await updateShiftApi(_id, {
          startTime: startDate,
          endTime: endDate,
          assigned: assignedUser,
        });
        setShowEditShiftModal(false);
        setUpdateShiftListFlag(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.EditShiftModalContent}>
      <TouchableOpacity
        style={styles.closeButtonArea}
        onPress={() => {
          setShowEditShiftModal(false);
        }}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.formHeader}>Assigned to: </Text>
        <Picker
          style={styles.picker}
          selectedValue={assignedUser}
          onValueChange={(itemValue) => {
            setAssignedUser(itemValue);
          }}>
          <Picker.Item key="" label="No One" value="" />
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
        title="Save Changes"
        onPress={() => {
          saveChanges();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  EditShiftModalContent: {
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
    fontSize: 20,
  },
  closeButtonArea: {
    top: 0,
    right: 0,
    position: 'absolute',
    zIndex: 2,
  },
});

export default EditShiftModalContent;
