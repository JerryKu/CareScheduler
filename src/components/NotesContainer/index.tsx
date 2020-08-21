import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Note, { NoteProps } from '../Note';

type NoteContainerProps = {
  notes: Array<NoteProps>;
};

type State = {
  notesArray: Array<NoteProps>;
};

class NotesContainer extends Component<NoteContainerProps, State> {
  //on any edit, set the notesArray to the new editted NoteList
  state = {
    notesArray: this.props.notes,
  };

  setEditingState = (index: number, value: boolean) => {
    let { notesArray } = this.state;
    notesArray = notesArray.map((note, currIndex) => {
      return currIndex === index
        ? {
            ...note,
            isEditing: value,
          }
        : {
            ...note,
            isEditing: false,
          };
    });
    this.setState({
      notesArray,
    });
  };

  render() {
    const { notesArray } = this.state;
    const { setEditingState } = this;
    return (
      <View style={styles.notesContainer}>
        {notesArray.map((note, index) => (
          <Note
            key={note.text}
            {...note}
            onFocus={() => {
              setEditingState(index, true);
            }}
            onBlur={() => {
              setEditingState(index, false);
            }}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notesContainer: {},
});

export default NotesContainer;
