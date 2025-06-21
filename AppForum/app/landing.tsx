import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { router, useRouter } from 'expo-router';
import Button from '@/components/Shared/Button';
import { navigate } from 'expo-router/build/global-state/routing';
import { Background } from '@react-navigation/elements';

export default function Landing() {
  const router=useRouter();
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/landingimg.jpg')}
        style={styles.image}
      />
      <Button style={{backgroundcolor:'#fff'}} text='let`s start' onPress={() =>router.push('/SignIn')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#D81444',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  customButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
