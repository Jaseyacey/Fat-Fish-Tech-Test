import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi';
import { Todo } from '../types/todo';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const todosQuery = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    ...todosQuery,
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    creating: createTodoMutation.isPending,
    updating: updateTodoMutation.isPending,
    deleting: deleteTodoMutation.isPending,
  };
};
