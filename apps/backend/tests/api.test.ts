import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-north-1' });

import { createTodo, deleteTodo, getTodos, updateTodos } from '../todo-api/handler';

describe('API Tests', () => {
  it('should create a new todo', async () => {
    const event = {
      body: JSON.stringify({ title: 'Test Todo', completed: false }),
    };

    const result = await createTodo(event);
    console.log('Create Todo Result:', result);
    expect(result.statusCode).toBe(201); 
    expect(JSON.parse(result.body).message).toBe('Todo created successfully!');
  });

  it('should fetch todos', async () => {
    const result = await getTodos();
    console.log('Fetch Todos Result:', result);
    expect(result.statusCode).toBe(200);    
    const todos = JSON.parse(result.body);
    expect(todos).toBeInstanceOf(Array);
    expect(todos.length).toBeGreaterThan(0);
  });

  it('should delete a todo', async () => {
    const result = await getTodos();
    const todos = JSON.parse(result.body);
    const todo = todos[0];

    const event = {
      pathParameters: {
        id: todo.id,
      },
    };

    const deleteResult = await deleteTodo(event);
    expect(deleteResult.statusCode).toBe(200);
    expect(JSON.parse(deleteResult.body).message).toBe('Todo deleted successfully!');
  });
});
