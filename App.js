import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , KeyboardAvoidingView } from 'react-native';


import Todo from './screens/ToDoApp';

export default function App() {
  return (
    <KeyboardAvoidingView 
      style={{flex: 1, marginTop: 40}}
      behavior="height"

      >
      <Todo/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
