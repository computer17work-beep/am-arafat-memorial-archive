// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDysIyTr7bIuE66qj0gMTGIQyFL3zL8USM",
  authDomain: "am-arafat-memorial-archive.firebaseapp.com",
  projectId: "am-arafat-memorial-archive",
  storageBucket: "am-arafat-memorial-archive.firebasestorage.app",
  messagingSenderId: "116897735667",
  appId: "1:116897735667:web:3ec2803444f319f6a9e886"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);