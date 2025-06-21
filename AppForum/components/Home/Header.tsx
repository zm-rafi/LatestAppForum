import { View, Text } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View>
      <View>
        <Text style={{
            fontSize: 30,
            color: '#87d0b7',
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            textTransform: 'uppercase',
        }}>
            welcome to
        </Text>
        <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor:'#D81444',
            borderRadius: 10,
            padding: 10,
            textAlign: 'center',
        }}>AppForum</Text>
      </View>
    </View>
  )
}