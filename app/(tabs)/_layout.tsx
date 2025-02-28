import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Calculator',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack>
  );
}