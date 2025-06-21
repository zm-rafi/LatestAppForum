import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import TextInputField from '@/components/Shared/TextInputField';
import Button from '@/components/Shared/Button';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
  if (!email || !password) {
    Alert.alert('Missing Info', 'Please enter both email and password');
    return;
  }

  try {
    const response = await axios.post('http://192.168.0.103:5000/api/users/login', {
      email,
      password,
    });

    Alert.alert('Login Success', `Welcome ${response.data.user.username}`);
    router.push('/(tabs)/Home'); // Navigate on successful login
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    Alert.alert('Login Failed', error.response?.data?.error || 'Something went wrong');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInputField label="Email" onChangeText={setEmail} />
      <View style={{ height: 16 }} />

      <TextInputField label="Password" onChangeText={setPassword} password />
      <View style={{ height: 24 }} />

      <Button text="Sign In" onPress={handleSignIn} />

      <TouchableOpacity onPress={() => router.push('/SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FEF7F9',
  },
  title: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  link: {
    marginTop: 20,
    color: '#bbb',
    textAlign: 'center',
    fontSize: 14,
  },
});
