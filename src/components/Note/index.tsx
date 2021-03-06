import React, { useState } from 'react';
import { bool, string, func } from 'prop-types';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export type NoteProps = {
  checked?: boolean;
  text: string;
  isEditing?: boolean;
  onFocus?: Function;
  onBlur?: Function;
};

const Note = ({
  checked,
  text,
  isEditing = false,
  onFocus = () => {},
  onBlur = () => {},
}: NoteProps) => {
  const [isChecked, setChecked] = useState(checked);
  const [currentText, onChangeText] = useState(text);
  const checkHandler = () => {
    setChecked(!isChecked);
  };

  return (
    <View style={styles.note}>
      <CheckBox
        style={styles.checkBox}
        value={isChecked}
        onValueChange={checkHandler}
        animationDuration={0.25}
      />
      {isEditing ? (
        <TextInput
          autoFocus
          style={styles.focusedText}
          onChangeText={onChangeText}
          onBlur={() => {
            onBlur();
          }}>
          {currentText}
        </TextInput>
      ) : (
        <Text
          style={styles.noteText}
          onPress={() => {
            onFocus();
          }}>
          {currentText}
        </Text>
      )}
    </View>
  );
};

Note.propTypes = {
  text: string.isRequired,
  checked: bool.isRequired,
  isEditing: bool,
  onFocus: func,
};

Note.defaultProps = {
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

export default Note;
