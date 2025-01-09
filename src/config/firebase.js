// src/config/firebase.js

// Import necessary Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration Production
const firebaseConfig = {
  apiKey: "AIzaSyDvy04VUFiQ-g2zjN-QzCEyay9SAzRncMY",
  authDomain: "wearer-c5407.firebaseapp.com",
  projectId: "wearer-c5407",
  storageBucket: "wearer-c5407.firebasestorage.app",
  messagingSenderId: "541832967101",
  appId: "1:541832967101:web:8fc66712411d42069f58d4",
  measurementId: "G-3Z57VN9TKQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app); // Optional: Analytics

// Export Firebase services
export { firestore, auth, analytics };
