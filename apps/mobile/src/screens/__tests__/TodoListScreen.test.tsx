import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import TodoListScreen from '../TodoListScreen';
import * as useTodosHook from '../../hooks/useTodos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as unknown as NativeStackNavigationProp<RootStackParamList, 'TodoList'>;

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

    const { getByText } = renderWithQueryClient(<TodoListScreen navigation={mockNavigation} />);
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

    const { getByText } = renderWithQueryClient(<TodoListScreen navigation={mockNavigation} />);
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

    const { getByText } = renderWithQueryClient(<TodoListScreen navigation={mockNavigation} />);
    await waitFor(() => {
      expect(getByText('Test Todo')).toBeTruthy();
      expect(getByText('Another Todo')).toBeTruthy();
    });
  });

  it('navigates to AddTodo screen', async () => {
    jest.spyOn(useTodosHook, 'useTodos').mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ id: '1', title: 'Test Todo', completed: false }],
      error: null,
      refetch: jest.fn(),
    } as any);
    const { getByText } = renderWithQueryClient(
      <TodoListScreen navigation={mockNavigation} />
    );
    const fabButton = getByText('+');
    fireEvent.press(fabButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AddTodo');
  }); 

});
