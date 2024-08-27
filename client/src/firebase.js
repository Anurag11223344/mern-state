// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d28ce.firebaseapp.com",
  projectId: "mern-estate-d28ce",
  storageBucket: "mern-estate-d28ce.appspot.com",
  messagingSenderId: "262687346160",
  appId: "1:262687346160:web:331834f2bbead083a6a135"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);