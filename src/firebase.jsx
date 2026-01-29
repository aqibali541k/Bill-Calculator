import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyApH2IESC2UfKd_NlsZ_w54hti0RyIQp3Q",
  authDomain: "aqibali44223.firebaseapp.com",
  projectId: "aqibali44223",
  storageBucket: "aqibali44223.firebasestorage.app",
  messagingSenderId: "531984786217",
  appId: "1:531984786217:web:5343453ce31bce0cf14d38",
  measurementId: "G-J3XCRYBGRL"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

export { analytics, auth, db }