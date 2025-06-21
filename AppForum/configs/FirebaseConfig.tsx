// FirebaseConfig.tsx
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native"; // ✅ Correct path!
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyD4uRnci4ui53B0nD3Lb2Y6pQXWW751t9U",
  authDomain: "symmetric-aura-436910-e0.firebaseapp.com",
  projectId: "symmetric-aura-436910-e0",
  storageBucket: "symmetric-aura-436910-e0.appspot.com", // ✅ fixed typo: should be .appspot.com
  messagingSenderId: "623691221863",
  appId: "1:623691221863:web:e9f9f8815e0035d0f8fdc2",
  measurementId: "G-87YJPM6RC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Fix is here: use getReactNativePersistence from firebase/auth/react-native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
