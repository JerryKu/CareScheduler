import React, { useState } from 'react';
import { bool, string, func } from 'prop-types';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export type ShiftProps = {
  checked?: boolean;
  text: string;
  isEditing?: boolean;
  onFocus?: Function;
  onBlur?: Function;
};

const Shift = ({
  text,
  isEditing = false,
  onFocus = () => {},
  onBlur = () => {},
}: ShiftProps) => {
  const [currentText, onChangeText] = useState(text);

  return (
    <View style={styles.note}>
      <Text
        style={styles.noteText}
        onPress={() => {
          onFocus();
        }}>
        {currentText}
      </Text>
    </View>
  );
};

Shift.propTypes = {
  text: string.isRequired,
  checked: bool.isRequired,
  isEditing: bool,
  onFocus: func,
};

Shift.defaultProps = {
  isEditing: false,
  onFocus: () => {},
};

const styles = StyleSheet.create({
  note: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkBox: {
    marginRight: 10,
  },
  noteText: {
    fontSize: 20,
  },
  focusedText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Shift;
