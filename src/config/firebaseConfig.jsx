// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuoQ1HwEPDYI78U4VvuPei64tJUyICLKo",
  authDomain: "persona-finance-tracker.firebaseapp.com",
  projectId: "persona-finance-tracker",
  storageBucket: "persona-finance-tracker.firebasestorage.app",
  messagingSenderId: "195976131629",
  appId: "1:195976131629:web:7600cc0e250c7d83f6f4a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };