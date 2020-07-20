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

  setEditingState = (index: number) => {
    let { notesArray } = this.state;
    console.log(index);
    notesArray = notesArray.map((note, currIndex) => {
      return currIndex === index
        ? {
            ...note,
            isEditing: true,
          }
        : {
            ...note,
            isEditing: false,
          };
    });
    console.log(notesArray);
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
              setEditingState(index);
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
