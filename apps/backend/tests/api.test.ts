import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent } from 'aws-lambda';

AWS.config.update({ region: 'eu-north-1' });

import { createTodo, deleteTodo, getTodos, updateTodos } from '../todo-api/handler';

describe('API Tests', () => {
  it('should create a new todo', async () => {
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({ title: 'Test Todo', completed: false }),
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'POST',
      isBase64Encoded: false,
      path: '/todos',
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: ''
    };

    const result = await createTodo(event);
    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body).message).toBe('Todo created successfully!');
  });

  it('should fetch todos', async () => {
    const result = await getTodos();
    expect(result.statusCode).toBe(200);    
    const todos = JSON.parse(result.body);
    expect(todos).toBeInstanceOf(Array);
    expect(todos.length).toBeGreaterThan(0);
  });

  it('should delete a todo', async () => {
    const result = await getTodos();
    const todos = JSON.parse(result.body);
    const todo = todos[0];
    const todoId = todo.id.S;

    const event: APIGatewayProxyEvent = {
      body: null,
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'DELETE',
      isBase64Encoded: false,
      path: `/todos/${todoId}`,
      pathParameters: {
        id: todoId,
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: ''
    };

    const deleteResult = await deleteTodo(event);
    expect(deleteResult.statusCode).toBe(200);
    expect(JSON.parse(deleteResult.body).message).toBe('Todo deleted successfully!');
  });
});
