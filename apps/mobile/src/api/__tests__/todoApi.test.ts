import {
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } from '../todoApi';
  import { Todo } from '../../types/todo';
  import { API_URL_ENDPOINT } from '@env';
  describe('todoApi', () => {
    it('fetches todos', async () => {
      const mockTodos: Todo[] = [
        { id: '1', title: 'Test Todo', completed: false },
      ];
  
      fetchMock.mockResponseOnce(JSON.stringify(mockTodos));
  
      const result = await fetchTodos();
      expect(result).toEqual(mockTodos);
      expect(fetchMock).toHaveBeenCalledWith(`${API_URL_ENDPOINT}`);
    });
  
    it('creates a todo', async () => {
      const newTodo = { title: 'New Todo', completed: false };
      const created = { id: '2', ...newTodo };
  
      fetchMock.mockResponseOnce(JSON.stringify(created));
  
      const result = await createTodo(newTodo);
      expect(result).toEqual(created);
    });
  
    it('updates a todo', async () => {
      const updated: Todo = { id: '1', title: 'Updated', completed: true };
  
      fetchMock.mockResponseOnce(JSON.stringify(updated));
  
      const result = await updateTodo(updated);
      expect(result).toEqual(updated);
    });

    it('deletes a todo', async () => {
      const id = '1';

      fetchMock.mockResponseOnce(JSON.stringify({deleteTodo: {id}}));
      const result = await deleteTodo(id);
      expect(result).toEqual(undefined);
  });
});
  
