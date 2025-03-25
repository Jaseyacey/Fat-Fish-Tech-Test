module.exports.createTodo = async (event) => {
  try {
    const todo = JSON.parse(event.body);

    if (!todo.title || typeof todo.title !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Title is required and must be a string' }),
      };
    }

    // placeholder before implementing db (e.g., DynamoDB, RDS, etc.)
    console.log('Creating todo:', todo);

    // Mock response for now
    const newTodo = { id: Date.now().toString(), ...todo };

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
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

module.exports.getTodos = async () => {
  try {
    // Fetch todos from database 
    const todos = [
      { id: '1', title: 'Test Todo', completed: false },
      { id: '2', title: 'Another Todo', completed: true },
    ];

    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (error) {
    console.error('Error fetching todos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
