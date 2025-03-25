import {
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } from '../todoApi';
  import { Todo } from '../../types/todo';
  
  describe('todoApi', () => {
    it('fetches todos', async () => {
      const mockTodos: Todo[] = [
        { id: '1', title: 'Test Todo', completed: false },
      ];
  
      fetchMock.mockResponseOnce(JSON.stringify(mockTodos));
  
      const result = await fetchTodos();
      expect(result).toEqual(mockTodos);
      expect(fetchMock).toHaveBeenCalledWith('https://your-api-url.com/todos');
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
      fetchMock.mockResponseOnce('', { status: 200 });
  
      await expect(deleteTodo('1')).resolves.toBeUndefined();
      expect(fetchMock).toHaveBeenCalledWith('https://your-api-url.com/todos/1', expect.any(Object));
    });
  });
  