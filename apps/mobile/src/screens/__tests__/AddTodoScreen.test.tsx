import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTodoScreen from '../AddTodoScreen';
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

describe('AddTodoScreen', () => {
  const mockCreateTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(useTodosHook, 'useTodos').mockReturnValue({
      createTodo: mockCreateTodo,
      creating: false,
    } as any);
  });

  it('disables button when input is empty', () => {
    const { getByRole } = renderWithQueryClient(<AddTodoScreen />);
    const button = getByRole('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('enables button when input has text and calls createTodo', async () => {
    const { getByPlaceholderText, getByText } = renderWithQueryClient(<AddTodoScreen />);
    const input = getByPlaceholderText('Enter a todo...');
    const button = getByText('Add Todo');

    fireEvent.changeText(input, 'Buy milk');
    fireEvent.press(button);

    expect(mockCreateTodo).toHaveBeenCalledWith(
      { title: 'Buy milk', completed: false },
      expect.any(Object)
    );
  });

  it('clears input on success', async () => {
    let onSuccess: () => void = () => {};
    mockCreateTodo.mockImplementation((_todo, opts) => {
      onSuccess = opts.onSuccess;
    });

    const { getByPlaceholderText, getByText } = renderWithQueryClient(<AddTodoScreen />);
    const input = getByPlaceholderText('Enter a todo...');

    fireEvent.changeText(input, 'Walk Bailey');
    fireEvent.press(getByText('Add Todo'));

    await waitFor(() => {
      onSuccess();
    });

    expect(input.props.value).toBe('');
  });
});
