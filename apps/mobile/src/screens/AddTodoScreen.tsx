import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTodos } from '../hooks/useTodos';

const AddTodoScreen = () => {
  const [title, setTitle] = useState('');
  const { createTodo, creating } = useTodos();

  const handleAdd = () => {
    if (!title.trim()) return;

    createTodo(
      { title, completed: false },
      {
        onSuccess: () => {
          setTitle('');
        },
        onError: () => {
          Alert.alert('Error', 'Failed to add todo');
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter a todo..."
        style={styles.input}
      />
      <Button title={creating ? 'Adding...' : 'Add Todo'} onPress={handleAdd} disabled={creating || !title.trim()} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
});

export default AddTodoScreen;
