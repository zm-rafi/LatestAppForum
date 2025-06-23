import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import axios from 'axios';

import Button from '@/components/Shared/Button';
import TextInputField from '@/components/Shared/TextInputField';

const showToast = (msg: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert('Notice', msg);
  }
};

export default function SignUp() {
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [studentId, setStudentId] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const pickImage = async () => {
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    // });

    // if (!result.canceled) {
    //   setProfileImage(result.assets[0].uri);
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../assets/images/profilePic.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.imageText}>Tap to upload profile photo</Text>
      </TouchableOpacity>

      <View style={styles.inputWrapper}>
        <TextInputField label="Username" onChangeText={setUserName} />
        <TextInputField label="Email" onChangeText={setEmail} />
        <TextInputField label="Student ID" onChangeText={setStudentId} />
        <TextInputField label="Password" password onChangeText={setPassword} />
      </View>

      <Button
  text="Create Account"
  onPress={async () => {
    if (!userName || !email || !studentId || !password) {
      showToast('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.103:5000/api/users', {
        username: userName,
        email,
        studentId,
        image: profileImage || '',
        password,
      });

      showToast('Account created successfully!');
      console.log('Response:', response.data);

      router.push('/SignIn');
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      showToast('Failed to create account!');
    }
  }}
/>


      <View style={styles.signinPrompt}>
        <Text style={styles.promptText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/SignIn')}>
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#FEF7F9',
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    marginBottom: 6,
  },
  imageText: {
    fontSize: 12,
    color: '#888',
  },
  inputWrapper: {
    width: '100%',
    gap: 14,
    marginBottom: 20,
  },
  signinPrompt: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  promptText: {
    fontSize: 14,
    color: '#555',
  },
  signinText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
