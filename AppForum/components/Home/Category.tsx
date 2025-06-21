import { View, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const categoryOptions = [
  {
    name: 'Upcoming',
    icon: 'calendar-outline',
    path: '(tabs)/Event',
  },
  {
    name: 'Latest Post',
    icon: 'book-outline',
    path: '(tabs)/Home',
  },
  {
    name: 'Members',
    icon: 'people-outline',
    path: '(tabs)/Clubs',
  },
  {
    name: 'Add new post',
    icon: 'add-circle-outline',
    path: 'add-post',
  },
];

export default function Category() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FlatList
        data={categoryOptions}
        numColumns={2}
        keyExtractor={(item) => item.name}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(item.path)}
            style={styles.cardContainer}
          >
            <Ionicons name={item.icon} size={28} color="#D81444" />
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 12
  },
  cardContainer: {
    backgroundColor: '#fdf4f8',
    width: Dimensions.get('screen').width * 0.35,
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
});
