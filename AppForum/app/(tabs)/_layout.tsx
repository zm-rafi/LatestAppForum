import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{
        tabBarActiveTintColor:'#D81444',
        headerShown: false
    }}>
        <Tabs.Screen name='Home'
        options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }}
        />
        <Tabs.Screen name='Event'
        options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />
        }}/>
        <Tabs.Screen name='Clubs'
        options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />
        }}/>
        <Tabs.Screen name='Profile'
        options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="man" size={size} color={color} />
        }}/>

    </Tabs>
  )
}