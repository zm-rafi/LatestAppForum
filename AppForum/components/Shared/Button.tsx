import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
type ButtonProps = {
    text:string;
    onPress: () => void;
}
export default function Button({text,onPress}:ButtonProps) {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={{
            padding:15,
            backgroundColor:'#E10040',
            marginTop:10,
            borderRadius:10
    }}>
        <Text style={{
            fontSize:18,
            textAlign:'center',
            color:'#fff',
            fontWeight:'bold',
        }}>{text}

        </Text>
      
    </TouchableOpacity>
  )
}