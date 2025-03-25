import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/api/queryClient';
import TodoListScreen from './src/screens/TodoListScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TodoListScreen />
        <AddTodoScreen />
      </QueryClientProvider>
    </Provider>
  );
}
