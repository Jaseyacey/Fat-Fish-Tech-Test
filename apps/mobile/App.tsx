import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/api/queryClient';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </Provider>
  );
}
