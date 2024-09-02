
// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQkCBVV4uyqjaxJxgF2hdURZ0sAXIzk9k",
  authDomain: "test-2c0d0.firebaseapp.com",
  projectId: "test-2c0d0",
  storageBucket: "test-2c0d0.appspot.com",
  messagingSenderId: "3419127971",
  appId: "1:3419127971:web:8a9460f769ed8e5bdeff16",
  measurementId: "G-NHZ77G0XRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Export the auth object for use in your app