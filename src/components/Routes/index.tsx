import React from 'react';
import Realm from 'realm';
import { Router, Scene } from 'react-native-router-flux';
import AuthPage from '@components/AuthPage';
import MainApp from '@components/MainApp';

const appId = 'carescheduler-ciszu'; // Set Realm app ID here.
const appConfig = {
  id: appId,
  timeout: 10000,
};
const app = new Realm.App(appConfig);

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="auth"
        component={AuthPage}
        title="Auth"
        initial={true}
        app={app}
      />
      <Scene key="home" component={MainApp} title="Home" />
    </Scene>
  </Router>
);
export default Routes;
