import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useTodos, useUpdateTodoMutation, useDeleteTodoMutation } from '../hooks/useTodos';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type TodoListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TodoList'>;
};

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const { data: todos, isLoading, isError } = useTodos();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleToggleComplete = (id: string, currentStatus: boolean) => {
    const currentTodo = todos?.find(todo => todo.id === id);
    if (currentTodo) {
      updateTodo({ ...currentTodo, completed: !currentStatus });
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
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoContent}
              onPress={() => handleToggleComplete(item.id, item.completed)}
            >
              <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
                {item.title}
              </Text>
              <Text style={[styles.statusText, item.completed ? styles.doneText : styles.notDoneText]}>
                {item.completed ? '✅' : '❌'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  todoItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  statusText: {
    marginLeft: 10,
    fontSize: 14,
  },
  doneText: {
    color: 'green',
  },
  notDoneText: {
    color: 'red',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
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
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default TodoListScreen;
