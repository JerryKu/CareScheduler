import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Shift, { ShiftProps } from '../Shift';

type ShiftContainerProps = {
  shiftArray: Array<ShiftProps>;
};

type State = {};

class ShiftsContainer extends Component<ShiftContainerProps, State> {
  state = {};

  render() {
    const { shiftArray } = this.props;
    return (
      <View style={styles.notesContainer}>
        {shiftArray.map((shift, index) => (
          <Shift {...shift} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notesContainer: {},
});

export default ShiftsContainer;
