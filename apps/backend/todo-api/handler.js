const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Create Todo
module.exports.createTodo = async (event) => {
  try {
    const todo = JSON.parse(event.body);
    console.log("Creating todo:", todo);

    if (!todo.title || typeof todo.title !== 'string') {
      console.error('Invalid todo title:', todo.title);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Title is required and must be a string' }),
      };
    }

    const newTodo = {
      id: Date.now().toString(),
      title: todo.title,
      completed: todo.completed || false,
    };

    // Log before inserting into DynamoDB
    console.log("Inserting into DynamoDB:", newTodo);

    await dynamoDB.put({
      TableName: 'Todos',
      Item: newTodo,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Todo created successfully!',
        todo: newTodo,
      }),
    };
  } catch (error) {
    console.error('Error creating todo:', error);  // Detailed error log
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};

// Get Todos
module.exports.getTodos = async () => {
  try {
    const result = await dynamoDB
      .scan({
        TableName: 'Todos',
      })
      .promise();

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
