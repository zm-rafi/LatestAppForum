import { View, Text } from 'react-native'
import React from 'react'
import EventCard from '../add-event/index'
export default function Event() {
  return (
    <View style={{
      padding: 20,
        paddingTop: 40,
    }}>
      <Text>Event</Text>
      <EventCard/>
    </View>
  )
}