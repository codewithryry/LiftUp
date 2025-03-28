// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyBzya1cXIn75-1zV1mp2QLvgu-1sGGkDCE",
  authDomain: "liftupconnect.firebaseapp.com",
  projectId: "liftupconnect",
  storageBucket: "liftupconnect.appspot.com",
  messagingSenderId: "636416167461",
  appId: "1:636416167461:web:e907e8f1855d8622def9cc",
  measurementId: "G-9C6CC2LHQV"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null
const googleProvider = new GoogleAuthProvider()

// Export the services you need
export { auth, db, analytics, googleProvider }