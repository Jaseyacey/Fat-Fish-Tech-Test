import axios from 'axios';
import {
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } from '../todoApi';
  import { Todo } from '../../types/todo';
  import { API_URL_ENDPOINT } from '@env';

  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  describe('todoApi', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('fetches todos', async () => {
      const mockTodos: Todo[] = [
        { id: '1', title: 'Test Todo', completed: false },
      ];
  
      mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });
  
      const result = await fetchTodos();
      expect(result).toEqual(mockTodos);
      expect(mockedAxios.get).toHaveBeenCalledWith(API_URL_ENDPOINT);
    });
  
    it('creates a todo', async () => {
      const newTodo = { title: 'New Todo', completed: false };
      const created = { id: '2', ...newTodo };
  
      mockedAxios.post.mockResolvedValueOnce({ data: created });
  
      const result = await createTodo(newTodo);
      expect(result).toEqual(created);
      expect(mockedAxios.post).toHaveBeenCalledWith(API_URL_ENDPOINT, newTodo);
    });
  
    it('updates a todo', async () => {
      const updated: Todo = { id: '1', title: 'Updated', completed: true };
  
      mockedAxios.put.mockResolvedValueOnce({ data: updated });
  
      const result = await updateTodo(updated);
      expect(result).toEqual(updated);
      expect(mockedAxios.put).toHaveBeenCalledWith(`${API_URL_ENDPOINT}/${updated.id}`, updated);
    });
    
    it('deletes a todo', async () => {
      const id = '1';
  
      mockedAxios.delete.mockResolvedValueOnce({});
  
      await deleteTodo(id);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL_ENDPOINT}/${id}`);
    });
  });
  