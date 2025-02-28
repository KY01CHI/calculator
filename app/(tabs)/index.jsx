import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calculator from './Calculator';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <>
        <StatusBar/>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {display: 'none'}
                }}
            >
                <Tab.Screen 
                    name="Calculator" 
                    component={Calculator} 
                    options={{
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        </>
    )
}