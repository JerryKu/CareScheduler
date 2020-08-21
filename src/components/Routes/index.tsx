import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import MainApp from '@components/MainApp';
import GroupScreen from '@components/GroupScreen';

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" component={MainApp} title="Home" initial={true} />
        <Scene key="groups" component={GroupScreen} title="Groups" />
      </Scene>
    </Router>
  );
};
export default Routes;
