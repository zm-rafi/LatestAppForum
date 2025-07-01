import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type EventCardProps = {
  image: any;
  category: string;
  title: string;
  subtext: string;
  daysLeft: string;
  attendees: number;
  mode: string;
  dateTime: string;
  location: string;
  _id?: string;
};

export default function EventCard({
  image,
  category,
  title,
  subtext,
  daysLeft,
  attendees,
  mode,
  dateTime,
  location,
  _id,
}: EventCardProps) {
  const [audienceVisible, setAudienceVisible] = useState(false);
  const [audience, setAudience] = useState<{ username: string; studentId: string }[]>([]);

  const fetchAudience = async () => {
    try {
      const response = await axios.get(`http://192.168.0.154:5000/api/events/${_id}/audience`);
      setAudience(response.data);
      setAudienceVisible(true);
    } catch (err) {
      console.error('Error fetching audience:', err);
    }
  };

  const registerUser = async () => {
    try {
      // Get user info from AsyncStorage
      const userString = await AsyncStorage.getItem('loggedInUser');
      if (!userString) {
        alert('User not logged in!');
        return;
      }
      const user = JSON.parse(userString);

      const userData = {
        username: user.username,
        studentId: user.studentId,
        email: user.email,
      };

      await axios.post(`http://192.168.0.154:5000/api/events/${_id}/audience`, userData);
      alert('Successfully registered!');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtext}>{subtext}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color="#4CAF50" />
            <Text style={styles.infoText}>{daysLeft}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="group" size={16} color="#777" />
            <Text style={styles.infoText}>{attendees} attending</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="web-off" size={16} color="#777" />
            <Text style={styles.detailText}>{mode}</Text>
          </View>
          <View style={styles.detailItem}>
            <AntDesign name="calendar" size={16} color="#777" />
            <Text style={styles.detailText}>{dateTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#777" />
            <Text style={styles.detailText}>{location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.shareBtn} onPress={fetchAudience}>
          <Text style={styles.shareText}>Audience</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={registerUser}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={audienceVisible} animationType="slide" onRequestClose={() => setAudienceVisible(false)}>
        <View style={{ padding: 20, flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Audience List</Text>
          <FlatList
            data={audience}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 8 }}>
                <Text>👤 {item.username} - {item.studentId}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => setAudienceVisible(false)} style={{ marginTop: 20 }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 16, margin: 16, elevation: 4,
    overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6,
  },
  image: { width: '100%', height: 160 },
  content: { padding: 16 },
  category: { color: '#A24C9B', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  subtext: { color: '#777', fontSize: 12, marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 12, color: '#444' },
  details: { gap: 6, marginBottom: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 12, color: '#555' },
  buttonRow: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#eee' },
  shareBtn: { flex: 1, padding: 14, alignItems: 'center', backgroundColor: '#f3f3f3' },
  shareText: { fontWeight: 'bold', color: '#333' },
  registerBtn: { flex: 1, padding: 14, alignItems: 'center', backgroundColor: '#000' },
  registerText: { color: '#fff', fontWeight: 'bold' },
});
