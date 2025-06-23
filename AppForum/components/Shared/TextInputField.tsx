import { View, Text,TextInput } from 'react-native'
import React from 'react'
type TextInputFieldProps = {
    label?: string;
    onChangeText?: (text: string) => void,
    password?: boolean;
}
export default function TextInputField({label,onChangeText,password=false}:TextInputFieldProps) {
  return (
    <View>
      {/* <Text>{label}</Text> */}
      <TextInput placeholder={label} style={styles.textInput}
      secureTextEntry={password}
      onChangeText={onChangeText}
      />
    </View>
  )
}

const styles = {
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#F2F3F6',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#000', // Black text for contrast
    backgroundColor: '#fff',
  },
};