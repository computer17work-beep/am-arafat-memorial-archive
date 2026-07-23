import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs 
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
const db = getFirestore(app);

// Memory Wall - Add Data
const btn = document.getElementById("sendMemory");

if (btn) {
  btn.onclick = async () => {
    const name = document.getElementById("name").value;
    const memory = document.getElementById("memory").value;

    if (!name || !memory) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "memories"), {
      name,
      memory
    });

    alert("Memory Added!");
    location.reload();
  };
}

// Memory Wall - Read Data (Fixed Crash Bug)
const list = document.getElementById("memoryList");

if (list) {
  const snapshot = await getDocs(collection(db, "memories"));
  snapshot.forEach((doc) => {
    list.innerHTML += `
      <div class="card">
        <h3>${doc.data().name}</h3>
        <p>${doc.data().memory}</p>
      </div>
    `;
  });
}