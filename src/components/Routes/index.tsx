import React, { useState } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import MainApp from '@components/MainApp';
import GroupScreen from '@components/GroupScreen';
import ShiftListsScreen from '@components/ShiftListsScreen';

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" component={MainApp} title="Home" initial={true} />
        <Scene key="groups" component={GroupScreen} title="Groups" />
        <Scene
          key="shiftLists"
          component={ShiftListsScreen}
          title="Shift Lists"
        />
      </Scene>
    </Router>
  );
};
export default Routes;
