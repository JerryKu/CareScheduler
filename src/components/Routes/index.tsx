import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import AuthPage from '@components/AuthPage';
import MainApp from '@components/MainApp';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="auth" component={AuthPage} title="Auth" initial={true} />
      <Scene key="home" component={MainApp} title="Home" />
    </Scene>
  </Router>
);
export default Routes;
