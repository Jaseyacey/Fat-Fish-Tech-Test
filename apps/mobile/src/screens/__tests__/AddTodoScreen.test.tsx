import axios from 'axios';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../api/todoApi';
import { Todo } from '../../types/todo';
import { API_URL_ENDPOINT } from '@env';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('todoApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches todos', async () => {
    const mockDynamoDBTodos = [
      {
        id: { S: '1' },
        title: { S: 'Test Todo' },
        completed: { BOOL: false }
      }
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockDynamoDBTodos });

    const result = await fetchTodos();
    expect(result).toEqual([
      { id: '1', title: 'Test Todo', completed: false }
    ]);
    expect(mockedAxios.get).toHaveBeenCalledWith(API_URL_ENDPOINT);
  });

  it('creates a todo', async () => {
    const newTodo = { title: 'New Todo', completed: false };
    const mockDynamoDBTodo = {
      id: { S: '2' },
      title: { S: 'New Todo' },
      completed: { BOOL: false }
    };

    mockedAxios.post.mockResolvedValueOnce({ data: { todo: mockDynamoDBTodo } });

    const result = await createTodo(newTodo);
    expect(result).toEqual({
      id: '2',
      title: 'New Todo',
      completed: false
    });
    expect(mockedAxios.post).toHaveBeenCalledWith(API_URL_ENDPOINT, newTodo);
  });

  it('updates a todo', async () => {
    const updated: Todo = { id: '1', title: 'Updated', completed: true };
    const mockDynamoDBTodo = {
      id: { S: '1' },
      title: { S: 'Updated' },
      completed: { BOOL: true }
    };

    mockedAxios.put.mockResolvedValueOnce({ data: mockDynamoDBTodo });

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