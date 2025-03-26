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
  const { data: todos, isLoading, isError, deleteTodo, updateTodo } = useTodos();

  const handleDelete = (id: string) => {
    const currentTodos = (todos || []).filter(todo => todo.id !== id);
    queryClient.setQueryData(['todos'], currentTodos);
    try {
      deleteTodo(id); 
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  const handleToggleComplete = (id: string, currentStatus: boolean) => {
    const updatedTodos = todos?.map(todo =>
      todo.id === id ? { ...todo, completed: !currentStatus } : todo
    );

    queryClient.setQueryData(['todos'], updatedTodos);

    try {
      const currentTodo = todos?.find(todo => todo.id === id);
      if (currentTodo) {
        updateTodo({ ...currentTodo, completed: !currentStatus });
      }
    } catch (error) {
      console.error('Failed to update todo status', error);
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => handleToggleComplete(item.id, item.completed)} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>{item.title}</Text>
              <Text style={{ color: item.completed ? 'green' : 'red' }}>
                {item.completed ? 'Done' : 'Not done'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity testID='DeleteItemButton' onPress={() => handleDelete(item.id)}>
              <Text style={{ fontSize: 24, color: 'red' }}>🗑️</Text>
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
