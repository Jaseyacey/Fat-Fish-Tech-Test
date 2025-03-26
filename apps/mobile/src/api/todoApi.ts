import { Todo } from '../types/todo';
import { API_URL_ENDPOINT } from '@env';

const apiUrl = API_URL_ENDPOINT;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  const response = await fetch(`${apiUrl}/${updatedTodo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
};
