// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5x9bI9jO_D1gPCawClZvAmhKRMov0Z3I",
  authDomain: "shortly-b9eb9.firebaseapp.com",
  projectId: "shortly-b9eb9",
  storageBucket: "shortly-b9eb9.appspot.com",
  messagingSenderId: "100581124968",
  appId: "1:100581124968:web:a68ad003899348bb16c4dd",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
