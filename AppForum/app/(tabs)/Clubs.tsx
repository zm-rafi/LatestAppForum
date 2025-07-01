import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  email: string;
  studentId: string;
  image: string;
}

export default function Clubs() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://192.168.0.154:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const deleteUser = async (username: string) => {
  Alert.alert('Confirm Delete', `Are you sure you want to delete ${username}?`, [
    { text: 'Cancel' },
    {
      text: 'Delete',
      onPress: async () => {
        try {
          await axios.delete(`http://192.168.0.154:5000/api/users/username/${username}`);
          setUsers(users.filter((user) => user.username !== username));
          Alert.alert('Success', 'User deleted successfully');
        } catch (err: any) {
          console.error('Delete failed:', err.response?.data || err.message);
          Alert.alert('Error', err.response?.data?.error || 'Delete failed');
        }
      },
      style: 'destructive',
    },
  ]);
};


  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/100' }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.id}>ID: {item.studentId}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteUser(item.username)} style={styles.deleteButton}>
  <Text style={styles.deleteText}>Delete</Text>
</TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FEF7F9',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  id: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#FF4C4C',
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
