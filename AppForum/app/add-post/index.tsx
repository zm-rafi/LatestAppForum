import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import UserAvatar from '@/components/Post/UserAvatar'
import WritePost from '@/components/Post/WritePost'

export default function AddPost() {
  return (
    // const {user} useContext(AuthContext);
    <View style={{
        padding:20
    }}>
      <UserAvatar/>
    </View>
  )
}