import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../screens/TodoListScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

export type RootStackParamList = {
  TodoList: undefined;
  AddTodo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="TodoList">
      <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Todos' }} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: 'Add Todo' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
