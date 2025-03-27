import { DynamoDBClient, PutItemCommand, ScanCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoDBClient = new DynamoDBClient({ region: 'eu-north-1' });

// Create Todo
export const createTodo = async (event) => {
  try {
    const todo = JSON.parse(event.body);
    const newTodo = {
      id: { S: Date.now().toString() },
      title: { S: todo.title },
      completed: { BOOL: todo.completed || false },
    };

    const params = {
      TableName: 'Todos',
      Item: newTodo,
    };
    console.log('Inserting new todo:', newTodo);

    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);

    console.log("Todo inserted:", newTodo);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Todo created successfully!',
        todo: newTodo,
      }),
    };
  } catch (error) {
    console.error('Error creating todo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};

// Get Todos
export const getTodos = async () => {
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
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

// Delete Todo
export const deleteTodo = async (event) => {
  const todoId = event.pathParameters.id;
  console.log('Deleting todo with ID:', todoId);

  try {
    const params = {
      TableName: 'Todos',
      Key: { id: todoId },
    };

    const command = new DeleteItemCommand(params);
    await dynamoDBClient.send(command);

    console.log('Todo deleted successfully:', todoId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Todo deleted successfully!',
      }),
    };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }),
    };
  }
};

// Update Todos
export const updateTodos = async (event) => {
  const todoId = event.pathParameters.id;
  const updatedTodo = JSON.parse(event.body);
  console.log('Updating todo with ID:', todoId);

  try {
    const params = {
      TableName: 'Todos',
      Key: { id: { S: todoId } }, 
      UpdateExpression: 'SET title = :title, completed = :completed',
      ExpressionAttributeValues: {
        ':title': { S: updatedTodo.title }, 
        ':completed': { BOOL: updatedTodo.completed },
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const command = new UpdateItemCommand(params); 
    await dynamoDBClient.send(command);

    console.log('Todo updated successfully:', todoId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Todo updated successfully!',
      }),
    };
  } catch (error) {
    console.error('Error updating todo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }),
    };
  }
};
