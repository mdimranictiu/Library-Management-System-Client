// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXQMzzN00cv6zUkpqdyAqF6579-fkyW74",
  authDomain: "library-management-syste-4cae8.firebaseapp.com",
  projectId: "library-management-syste-4cae8",
  storageBucket: "library-management-syste-4cae8.firebasestorage.app",
  messagingSenderId: "965155436609",
  appId: "1:965155436609:web:0d45039a2812a59a5caec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);