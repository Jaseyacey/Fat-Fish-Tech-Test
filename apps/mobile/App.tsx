import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Text, View } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/api/queryClient';

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Todo App Setup</Text>
        </View>
      </QueryClientProvider>
    </Provider>
  );
}
