import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useTodos } from '../hooks/useTodos';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { queryClient } from '../api/queryClient';

type TodoListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TodoList'>;
};

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const { data: todos, isLoading, isError, deleteTodo } = useTodos();

  const handleDelete = async (id: string) => {
    const currentTodos = (todos || []).filter(todo => todo.id !== id);
    queryClient.setQueryData(['todos'], currentTodos);
  
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo', error);
      queryClient.setQueryData(['todos'], todos);
    }
  };

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
        <Button testID="add_todo_screen_button" title="Add todo" onPress={() => navigation.navigate('AddTodo')} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: item.completed ? 'green' : 'red' }}>
                {item.completed ? 'Done' : 'Not done'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default TodoListScreen;
