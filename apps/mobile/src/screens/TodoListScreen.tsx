import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useTodos } from '../hooks/useTodos';

const TodoListScreen = () => {
  const { data: todos, isLoading, isError } = useTodos();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading todos...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Something went wrong while fetching todos.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 12,
            backgroundColor: '#f4f4f4',
            marginBottom: 8,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
          <Text style={{ color: item.completed ? 'green' : 'red' }}>
            {item.completed ? 'Done' : 'Not done'}
          </Text>
        </View>
      )}
    />
  );
};

export default TodoListScreen;
