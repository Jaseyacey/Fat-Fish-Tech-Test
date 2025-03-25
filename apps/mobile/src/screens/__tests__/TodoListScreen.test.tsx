import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import TodoListScreen from '../TodoListScreen';
import * as useTodosHook from '../../hooks/useTodos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('TodoListScreen', () => {
  it('shows loading state', () => {
    jest.spyOn(useTodosHook, 'useTodos').mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      error: null,
      refetch: jest.fn(),
    } as any);

    const { getByText } = renderWithQueryClient(<TodoListScreen />);
    expect(getByText('Loading todos...')).toBeTruthy();
  });

  it('shows error state', () => {
    jest.spyOn(useTodosHook, 'useTodos').mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: new Error('Boom'),
      refetch: jest.fn(),
    } as any);

    const { getByText } = renderWithQueryClient(<TodoListScreen />);
    expect(getByText(/something went wrong/i)).toBeTruthy();
  });

  it('renders todos', async () => {
    const mockTodos = [
      { id: '1', title: 'Test Todo', completed: false },
      { id: '2', title: 'Another Todo', completed: true },
    ];

    jest.spyOn(useTodosHook, 'useTodos').mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockTodos,
      error: null,
      refetch: jest.fn(),
    } as any);

    const { getByText } = renderWithQueryClient(<TodoListScreen />);
    await waitFor(() => {
      expect(getByText('Test Todo')).toBeTruthy();
      expect(getByText('Another Todo')).toBeTruthy();
    });
  });
});
