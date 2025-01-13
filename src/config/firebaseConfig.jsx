// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence);

export { auth, db, storage, googleProvider };