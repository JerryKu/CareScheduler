import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HeaderBar = () => {
  return (
    <View style={styles.headerBar}>
      <Text>Care Scheduler</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {},
});

export default HeaderBar;
