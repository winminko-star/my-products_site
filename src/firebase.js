// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAlz2r4_ZeuVMIfO5kTZE4RyGOGQ-KWCsU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "restaurant-data-3c2b2.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://restaurant-data-3c2b2-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "restaurant-data-3c2b2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "restaurant-data-3c2b2.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "776367819444",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:776367819444:web:c88b697cb7b7ebad0425e1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PFTJH6TYFZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
