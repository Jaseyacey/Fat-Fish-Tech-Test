import { DynamoDBClient, PutItemCommand, ScanCommand, DeleteItemCommand, UpdateItemCommand, ReturnValue } from '@aws-sdk/client-dynamodb';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

interface Todo {
  title: string;
  completed: boolean;
}

interface DynamoDBTodo {
  id: { S: string };
  title: { S: string };
  completed: { BOOL: boolean };
}

const dynamoDBClient = new DynamoDBClient({ region: 'eu-north-1' });

const validateTodoInput = (todo: any): todo is Todo => {
  return (
    typeof todo === 'object' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean'
  );
};

const createDynamoDBTodo = (todo: Todo, id: string): DynamoDBTodo => ({
  id: { S: id },
  title: { S: todo.title },
  completed: { BOOL: todo.completed },
});

// Create Todo
export const createTodo = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const todo = JSON.parse(event.body || '{}');
    
    if (!validateTodoInput(todo)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid todo input' }),
      };
    }

    const newTodo = createDynamoDBTodo(todo, Date.now().toString());
    const params = {
      TableName: 'Todos',
      Item: newTodo,
    };

    const command = new PutItemCommand({
      TableName: 'Todos',
      Item: {
        id: { S: newTodo.id.S },
        title: { S: newTodo.title.S },
        completed: { BOOL: newTodo.completed.BOOL }
      }
    });
    await dynamoDBClient.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Todo created successfully!',
        todo: newTodo,
      }),
    };
  } catch (error) {
    console.error('Error creating todo:', error);
    if (error instanceof Error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Database operation failed' }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

// Get Todos
export const getTodos = async (): Promise<APIGatewayProxyResult> => {
  try {
    const params = {
      TableName: 'Todos',
    };

    const command = new ScanCommand(params);
    const result = await dynamoDBClient.send(command);

    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No todos found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching todos:', error);
    if (error instanceof Error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Database operation failed' }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

// Delete Todo
export const deleteTodo = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters?.id;

  if (!todoId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Todo ID is required' }),
    };
  }

  try {
    const params = {
      TableName: 'Todos',
      Key: { id: { S: todoId } },
    };

    const command = new DeleteItemCommand(params);
    await dynamoDBClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Todo deleted successfully!',
      }),
    };
  } catch (error) {
    console.error('Error deleting todo:', error);
    if (error instanceof Error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Database operation failed' }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

// Update Todo
export const updateTodos = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters?.id;
  const body = event.body ? JSON.parse(event.body) : {};

  if (!todoId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Todo ID is required' }),
    };
  }

  if (!validateTodoInput(body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid todo input' }),
    };
  }

  try {
    const params = {
      TableName: 'Todos',
      Key: { id: { S: todoId } },
      UpdateExpression: 'SET title = :title, completed = :completed',
      ExpressionAttributeValues: {
        ':title': { S: body.title },
        ':completed': { BOOL: body.completed },
      },
      ReturnValues: ReturnValue.ALL_NEW,
    };

    const command = new UpdateItemCommand(params);
    await dynamoDBClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Todo updated successfully!',
      }),
    };
  } catch (error) {
    console.error('Error updating todo:', error);
    if (error instanceof Error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Database operation failed' }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
