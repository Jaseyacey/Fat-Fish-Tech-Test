import { Todo } from '../types/todo';
import { API_URL_ENDPOINT } from '@env';
import axios from 'axios';

const apiUrl = API_URL_ENDPOINT;

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(apiUrl);
    return response.data;
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post(apiUrl, newTodo);
  return response.data;
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  const response = await axios.put(`${apiUrl}/${updatedTodo.id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};
