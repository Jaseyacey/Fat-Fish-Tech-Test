import { Todo } from '../types/todo';
import { API_URL_ENDPOINT } from '@env';
import axios from 'axios';

const apiUrl = API_URL_ENDPOINT;

interface DynamoDBItem {
  id: { S: string };
  title: { S: string };
  completed: { BOOL: boolean };
}

const transformDynamoDBItem = (item: DynamoDBItem): Todo => ({
  id: item.id.S,
  title: item.title.S,
  completed: item.completed.BOOL,
});

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(apiUrl);
  return Array.isArray(response.data) 
    ? response.data.map(transformDynamoDBItem)
    : [];
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await axios.post(apiUrl, newTodo);
  return transformDynamoDBItem(response.data.todo);
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  const response = await axios.put(`${apiUrl}/${updatedTodo.id}`, updatedTodo);
  return transformDynamoDBItem(response.data);
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};
