import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Shift from '@components/Shift';
import { getShiftListId } from '../../utils/globalUtils';
import { getShiftsByShiftListIdApi } from '@apis/apis';
import { IShift } from '@interfaces/Shift';

const ShiftsContainer = ({
  updateShiftListFlag,
  setUpdateShiftListFlag,
}: {
  updateShiftListFlag: boolean;
  setUpdateShiftListFlag: Function;
}) => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  useEffect(() => {
    const loadShifts = async () => {
      const shiftListId = await getShiftListId();
      if (shiftListId) {
        const currentShifts = await getShiftsByShiftListIdApi({ shiftListId });
        setShifts(currentShifts);
      }
    };
    if (updateShiftListFlag) {
      loadShifts();
      setUpdateShiftListFlag(false);
    }
  }, [updateShiftListFlag, setUpdateShiftListFlag]);

  return (
    <View style={styles.shiftsContainer}>
      {shifts.map((shift) => (
        <Shift key={shift._id} {...shift} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  shiftsContainer: {},
});

export default ShiftsContainer;
