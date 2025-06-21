import { View, Text, TextInput,StyleSheet,Image } from 'react-native'
import React from 'react'

import Button from '../Shared/Button'
export default function WritePost() {
  const OnCreate = () => {
    // Handle post creation logic here
    console.log("Post created");
  }
  return (
    <View>
      <TextInput placeholder='Write yout post here...'
      style={styles.textInput}
        multiline={true}
        numberOfLines={5}
        maxLength={1000}

      />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',}}>
        <Image
       style={styles.image}
      source={require('./../../assets/images/image.png')}/>

      <Button text='POST' onPress={OnCreate}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    textInput:{
        padding :10,
        backgroundColor : '#fff',
        height:140,
        marginTop:10,
        borderRadius:10,
        textAlignVertical: 'top',
        elevation: 7,
    },
    image:{
        width: 50,
        height: 50,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor:'#fff',
    }
})