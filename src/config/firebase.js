// src/config/firebase.js

// Import necessary Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKdT12bkIkGoG4rTi2BOGhiqdkDoxmVd0",
  authDomain: "wearers-d5e0d.firebaseapp.com",
  projectId: "wearers-d5e0d",
  storageBucket: "wearers-d5e0d.firebasestorage.app",
  messagingSenderId: "800358559773",
  appId: "1:800358559773:web:de1993c423d503959016f4",
  measurementId: "G-E1CEKE0Y12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app);
const auth = getAuth(app); // Add Firebase Authentication
const analytics = getAnalytics(app); // Optional: Analytics

// Export Firebase services
export { firestore, auth, analytics };
