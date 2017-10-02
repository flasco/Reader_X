import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './screens';
import { Text } from 'react-native';
import FetchMock from 'react-native-fetch-mock';
import ThemeProvider, { theme } from './theme';

// mock data
const fetch = new FetchMock(require('../__mocks__')).fetch;
global.fetch = fetch;

export default (props) => {
  return (
    <ThemeProvider>
      <StatusBar barStyle={theme.styles.barStyle} />
      <AppNavigator a={1} />
    </ThemeProvider>
  );
};
