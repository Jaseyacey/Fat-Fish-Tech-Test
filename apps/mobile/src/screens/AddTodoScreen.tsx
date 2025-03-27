import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useCreateTodoMutation } from '../hooks/useTodos';

const AddTodoScreen = () => {
  const [title, setTitle] = useState('');
  const { mutate: createTodo, isPending: creating } = useCreateTodoMutation();

  const handleAdd = () => {
    if (!title.trim()) return;

    const todoTitle = title.trim();
    setTitle('');

    createTodo(
      { title: todoTitle, completed: false },
      {
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
      <View style={[styles.button, (!title.trim() || creating) && styles.buttonDisabled]}>
        <Button 
          title={creating ? 'Adding...' : 'Add Todo'} 
          onPress={handleAdd} 
          disabled={creating || !title.trim()}
          color={(!title.trim() || creating) ? '#007bff' : '#fff'}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#fff',
  },
});

export default AddTodoScreen;
