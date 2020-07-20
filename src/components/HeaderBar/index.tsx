import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderBar = () => {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerText}>Care Scheduler</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default HeaderBar;
