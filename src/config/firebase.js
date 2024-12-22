// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const authApp = initializeApp(firebaseConfig);
export { authApp };
