import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOmY7zC7TqiK2N0kTcRuiToV-ouh3JaQ4",
  authDomain: "anime-tracker-april.firebaseapp.com",
  projectId: "anime-tracker-april",
  storageBucket: "anime-tracker-april.firebasestorage.app",
  messagingSenderId: "645504487139",
  appId: "1:645504487139:web:ffdc14811e73d6a2f33fd6",
  databaseURL:
    "https://anime-tracker-april-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database }