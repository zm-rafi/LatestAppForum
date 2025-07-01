import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import EventCard, { EventCardProps } from '../../components/eventCard/EventCard';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL || 'http://192.168.0.154:5000';

export default function Event() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<null | 'date' | 'time'>(null);

  const [form, setForm] = useState({
    title: '',
    subtext: '',
    date: new Date(),
    time: new Date(),
    location: '',
    image: '',
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events`);
      setEvents(response.data);
    } catch (err) {
      console.log('Error fetching events:', err);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const imageUrl = await uploadToCloudinary(localUri);
      setForm((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const uploadToCloudinary = async (imageUri: string): Promise<string> => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    } as any);
    data.append('upload_preset', 'ForumApp');
    data.append('cloud_name', 'dagyix0lw');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dagyix0lw/image/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      return json.secure_url;
    } catch (err) {
      console.error('Cloudinary Upload Error', err);
      throw err;
    }
  };

  const handleCreateEvent = async () => {
    if (!form.title || !form.date || !form.time || !form.location) {
      Alert.alert('Missing Info', 'Please fill in all fields!');
      return;
    }

    const mergedDateTime = new Date(form.date);
    mergedDateTime.setHours(form.time.getHours());
    mergedDateTime.setMinutes(form.time.getMinutes());

    const newEvent = {
      title: form.title,
      subtext: form.subtext,
      location: form.location,
      image: form.image,
      dateTime: mergedDateTime.toISOString(),
      category: 'User Created',
      daysLeft: '1 day',
      attendees: 0,
      mode: 'Offline',
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/events`, newEvent);
      setEvents((prev) => [response.data, ...prev]);
      setModalVisible(false);
      setForm({ title: '', subtext: '', date: new Date(), time: new Date(), location: '', image: '' });
    } catch (err) {
      console.log('Error creating event:', err);
    }
  };

  const calculateTimeLeft = (eventDateTime: string) => {
    const currentTime = new Date();
    const eventTime = new Date(eventDateTime);
    const timeLeft = eventTime.getTime() - currentTime.getTime();
    if (timeLeft <= 0) return 'Event Started';

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days ${hours} hours ${minutes} minutes left`;
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(() => {
      setEvents((prev) =>
        prev.map((event) => ({
          ...event,
          daysLeft: calculateTimeLeft(event.dateTime),
        }))
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={{ padding: 20, paddingTop: 40 }}>
      <View style={styles.headerRow}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Events</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Event</Text>
        </TouchableOpacity>
      </View>

      {events.map((event, index) => (
        <EventCard key={index} {...event} image={{ uri: event.image }} />
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Event</Text>

          <TextInput style={styles.input} placeholder="Title" value={form.title} onChangeText={(text) => setForm({ ...form, title: text })} />
          <TextInput style={styles.input} placeholder="Subtext" value={form.subtext} onChangeText={(text) => setForm({ ...form, subtext: text })} />

          <TouchableOpacity onPress={() => setShowDatePicker('date')} style={styles.input}>
            <Text>Select Date: {form.date.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowDatePicker('time')} style={styles.input}>
            <Text>Select Time: {form.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={showDatePicker === 'date' ? form.date : form.time}
              mode={showDatePicker}
              display="default"
              onChange={(event, selected) => {
                setShowDatePicker(null);
                if (selected) {
                  if (showDatePicker === 'date') setForm({ ...form, date: selected });
                  else setForm({ ...form, time: selected });
                }
              }}
            />
          )}

          <TextInput style={styles.input} placeholder="Location" value={form.location} onChangeText={(text) => setForm({ ...form, location: text })} />

          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          </TouchableOpacity>

          {form.image ? <Image source={{ uri: form.image }} style={styles.imagePreview} /> : null}

          <Button title="Create" onPress={handleCreateEvent} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  imagePickerButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});
