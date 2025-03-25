import { fetchTodos, createTodo } from '../todoApi';
import { Todo } from '../../types/todo';

describe('todoApi', () => {
  it('fetches todos', async () => {
    const mockTodos: Todo[] = [
      { id: '1', title: 'Test todo', completed: false },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockTodos));

    const result = await fetchTodos();
    expect(result).toEqual(mockTodos);
  });

  it('creates a todo', async () => {
    const newTodo = { title: 'New Todo', completed: false };
    const createdTodo = { id: '2', ...newTodo };
    fetchMock.mockResponseOnce(JSON.stringify(createdTodo));

    const result = await createTodo(newTodo);
    expect(result).toEqual(createdTodo);
  });
});
