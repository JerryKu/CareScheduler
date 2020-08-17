/**
 * @format
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Routes from '@components/Routes';
import axios from 'axios';

axios.defaults.baseURL = 'https://care-scheduler-server.herokuapp.com';

class App extends Component {
  render() {
    return <Routes />;
  }
}

AppRegistry.registerComponent(appName, () => App);
