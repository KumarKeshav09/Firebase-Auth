
// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTnJ2DdcgEDApTSnwjpxKIAVNtQn9lhV0",
  authDomain: "auth-b178a.firebaseapp.com",
  projectId: "auth-b178a",
  storageBucket: "auth-b178a.appspot.com",
  messagingSenderId: "79661203269",
  appId: "1:79661203269:web:fbbc0cdd73eed05341c82c",
  measurementId: "G-FZ35WLSS6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Export the auth object for use in your app