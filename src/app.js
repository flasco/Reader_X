import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './screens';
import { Text } from 'react-native';
import FetchMock from 'react-native-fetch-mock';
import ThemeProvider, { theme } from './theme';

import DeviceStorage from './utils/DeviceStorage';
global.DeviceStorage = DeviceStorage;

// mock data
// const fetch = new FetchMock(require('../__mocks__')).fetch;
// global.fetch = fetch;


export default (props) => {
  return (
    <ThemeProvider>
      <StatusBar barStyle={theme.styles.barStyle} />
      <AppNavigator />
    </ThemeProvider>
  );
};
