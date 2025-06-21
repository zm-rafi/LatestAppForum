import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { getPathDataFromState } from 'expo-router/build/fork/getPathFromState';

type EventCardProps = {
  image: any; // require('./path') or { uri: '...' }
  category: string;
  title: string;
  subtext: string;
  daysLeft: string;
  attendees: number;
  mode: string;
  dateTime: string;
  location: string;
  onRegister?: () => void;
  onShare?: () => void;
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
  onRegister,
  onShare,
}: EventCardProps) {
  return (
    <View>
      {/* make a navbar with 2 options one for upcoming and other for previous */}
    <View style={styles.card}>
      {/* Top image */}
      <Image source={image} style={styles.image} resizeMode="cover" />

      {/* Content */}
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

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.shareBtn} onPress={onShare}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    elevation: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  category: {
    color: '#A24C9B',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtext: {
    color: '#777',
    fontSize: 12,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#444',
  },
  details: {
    gap: 6,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  shareBtn: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  shareText: {
    fontWeight: 'bold',
    color: '#333',
  },
  registerBtn: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
