// --- Event.tsx ---
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Image } from 'react-native';
import axios from 'axios';
import EventCard, { EventCardProps } from '../../components/eventCard/EventCard';

export default function Event() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subtext: '',
    dateTime: '',
    location: '',
    image: '', // URL or base64
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://192.168.0.103:5000/api/events');
      setEvents(response.data);
    } catch (err) {
      console.log('Error fetching events:', err);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const newEvent = {
        ...form,
        category: 'User Created',
        daysLeft: '1 day',
        attendees: 0,
        mode: 'Offline',
      };
      const response = await axios.post('http://192.168.0.103:5000/api/events', newEvent);
      setEvents(prev => [response.data, ...prev]);
      setModalVisible(false);
      setForm({ title: '', subtext: '', dateTime: '', location: '', image: '' });
    } catch (err) {
      console.log('Error creating event:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
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
        <EventCard
          key={index}
          image={{ uri: event.image }}
          category={event.category}
          title={event.title}
          subtext={event.subtext}
          daysLeft={event.daysLeft}
          attendees={event.attendees}
          mode={event.mode}
          dateTime={event.dateTime}
          location={event.location}
        />
      ))}

      {/* Modal for Adding Event */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Event</Text>
          <TextInput style={styles.input} placeholder="Title" value={form.title} onChangeText={text => setForm({ ...form, title: text })} />
          <TextInput style={styles.input} placeholder="Subtext" value={form.subtext} onChangeText={text => setForm({ ...form, subtext: text })} />
          <TextInput style={styles.input} placeholder="Date & Time" value={form.dateTime} onChangeText={text => setForm({ ...form, dateTime: text })} />
          <TextInput style={styles.input} placeholder="Location" value={form.location} onChangeText={text => setForm({ ...form, location: text })} />
          <TextInput style={styles.input} placeholder="Image URL" value={form.image} onChangeText={text => setForm({ ...form, image: text })} />
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
});
