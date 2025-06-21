import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import EventCard from '@/components/eventCard/EventCard'

export default function AddEvent() {
  return (
    // const {user} useContext(AuthContext);
    <View style={{
        padding:20
    }}>
      <EventCard/>
    </View>
  )
}