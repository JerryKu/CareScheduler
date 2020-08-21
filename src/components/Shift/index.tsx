import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IShift } from '@interfaces/Shift';
import moment from 'moment';
import { getUserObjByUserIdApi } from '@apis/apis';

const Shift = ({ endTime, startTime, assigned }: IShift) => {
  const [assignedName, setAssignedName] = useState('');

  useEffect(() => {
    const grabUserInfo = async () => {
      if (assigned) {
        const user = await getUserObjByUserIdApi({ userId: assigned });
        if (user) {
          setAssignedName(`${user.firstName} ${user.lastName}`);
        }
      }
    };
    grabUserInfo();
  }, [assigned]);

  return (
    <View style={styles.shift}>
      <Text style={styles.shiftText}>{assignedName}</Text>
      <Text style={styles.shiftText}>{`${moment(startTime).format(
        'LT',
      )} - ${moment(endTime).format('LT')}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shift: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    backgroundColor: 'lightgrey',
  },
  shiftText: {
    fontSize: 18,
    fontWeight: '400',
  },
});

export default Shift;
