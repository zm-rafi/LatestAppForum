import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import TextInputField from '@/components/Shared/TextInputField';
import Button from '@/components/Shared/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [image, setImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');


  // ✅ Load user from AsyncStorage
  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem('loggedInUser');
      if (!stored) return Alert.alert('User not logged in');

      const user = JSON.parse(stored);
      setUserId(user._id);
      setUsername(user.username);
      setEmail(user.email);
      setStudentId(user.studentId);
      setImage(user.image || '');
      setOriginalEmail(user.email); // fixed identity
      setEmail(user.email);         // editable input

    } catch (error: unknown) {
      const err = error as Error;
      Alert.alert('Error loading profile', err.message);
    }
  };

  // ✅ Call it on screen mount
  useEffect(() => {
    loadUser();
  }, []);

  const handleSave = async () => {
  try {
    const response = await axios.put(`http://192.168.0.103:5000/api/users/by-email/${originalEmail}`, {
      username,
      email,
      studentId,
    });

    await AsyncStorage.setItem('loggedInUser', JSON.stringify(response.data));

    Alert.alert('Profile updated!');
    setIsEditing(false);
    setOriginalEmail(response.data.email); // update to new email if changed
  } catch (err: any) {
    console.error("Update error:", err?.response?.data || err.message);
    Alert.alert('Error updating profile');
  }
};




  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <TextInputField
        label="Username"
        value={username}
        onChangeText={setUsername}
        editable={isEditing}
      />
      <TextInputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        editable={isEditing}
      />
      <TextInputField
        label="Student ID"
        value={studentId}
        onChangeText={setStudentId}
        editable={isEditing}
      />

      <View style={{ height: 20 }} />
      <Button
        text={isEditing ? 'Save Changes' : 'Edit Profile'}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FEF7F9',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
});
