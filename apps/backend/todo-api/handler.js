const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Create Todo
module.exports.createTodo = async (event) => {
  try {
    const todo = JSON.parse(event.body);
    // Define newTodo with an id
    const newTodo = {
      id: Date.now().toString(),
      title: todo.title,
      completed: todo.completed || false,
    };

    // DynamoDB insertion
    await dynamoDB.put({
      TableName: 'Todos',
      Item: newTodo,
    }).promise();
    
    console.log("Todo inserted:", newTodo);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Todo created successfully!',
        todo: newTodo,
      }),
    };
  } catch (error) {
    console.error('Error creating todo🍎🍎:', error);
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
