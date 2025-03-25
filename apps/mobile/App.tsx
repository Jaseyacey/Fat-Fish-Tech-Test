import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Redux Store Connected</Text>
      </View>
    </Provider>
  );
}
