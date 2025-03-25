import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Todo App Setup</Text>
      </View>
    </Provider>
  );
}

