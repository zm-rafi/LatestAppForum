import { View, TextInput } from 'react-native';
import React from 'react';

type TextInputFieldProps = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  password?: boolean;
  editable?: boolean;
};

export default function TextInputField({
  label,
  value ,
  onChangeText,
  password = false,
  editable = true, // ✅ destructured properly
}: TextInputFieldProps) {
  return (
    <View>
      <TextInput
        placeholder={label}
        value={value}
        style={styles.textInput}
        secureTextEntry={password}
        editable={editable}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = {
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#F2F3F6',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
};
