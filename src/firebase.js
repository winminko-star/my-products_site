// ✅ src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlz2r4_ZeuVMIfO5kTZE4RyGOGQ-KWCsU",
  authDomain: "restaurant-data-3c2b2.firebaseapp.com",
  projectId: "restaurant-data-3c2b2",
  storageBucket: "restaurant-data-3c2b2.appspot.com",
  messagingSenderId: "776367819444",
  appId: "1:776367819444:web:c88b697cb7b7ebad0425e1",
  measurementId: "G-ZTEZRY3EFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
