import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Category from '@/components/Home/Category'

export default function Home() {
  return (
    <View style={{
      backgroundColor:'#fff',
        padding: 20,
        paddingTop: 40,
    }}>
        {/* header */}
        <Header/>
        {/* category */}
        <Category/>
        {/* latestpost */}

    </View>
  )
}