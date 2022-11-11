import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {DataProvider, Provider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import {decode, encode} from 'base-64';
import {RootStore} from './src/stores/RootStore';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return (
    <DataProvider>
      <Provider value={RootStore}>
        <AppNavigation />
      </Provider>
    </DataProvider>
  );
}
