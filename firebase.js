import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, doc, updateDoc 
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

// 🎂 1. Birthday Banner Checker (Example: July 24)
const today = new Date();
const currentMonth = today.getMonth() + 1; // July = 7
const currentDay = today.getDate(); // 24

if (currentMonth === 7 && currentDay === 24) {
  const banner = document.getElementById("birthdayBanner");
  if (banner) banner.style.display = "block";
}

// 📅 2. "Today in Memory" Engine
const todayContainer = document.getElementById("todayInMemory");
const todayContent = document.getElementById("todayMemoryContent");

if (todayContainer) {
  getDocs(collection(db, "photos")).then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.approved && data.date) {
        const photoDate = new Date(data.date);
        
        // তারিখ ও মাস মিলে গেলে "Today in Memory"-তে দেখাবে
        if (photoDate.getMonth() + 1 === currentMonth && photoDate.getDate() === currentDay) {
          todayContainer.style.display = "block";
          document.getElementById("todayMemoryDate").innerText = `On this day in ${photoDate.getFullYear()}`;
          todayContent.innerHTML = `
            <img src="${data.imageUrl}" style="width: 100%; border-radius: 12px; height: 250px; object-fit: cover;">
            <p style="margin-top: 10px;"><strong>${data.caption}</strong></p>
            <p style="font-size: 12px; color: #94a3b8;">📍 ${data.place || 'Unknown Place'}</p>
          `;
        }
      }
    });
  });
}

// 📷 3. Photo Upload (With schema: photos)
const uploadBtn = document.getElementById("uploadPhotoBtn");
if (uploadBtn) {
  uploadBtn.onclick = async () => {
    const imageUrl = document.getElementById("imgUrlInput").value;
    const caption = document.getElementById("captionInput").value;
    const place = document.getElementById("placeInput").value;
    const date = document.getElementById("dateInput").value;

    if (!imageUrl || !caption) {
      alert("Image URL and Caption are required!");
      return;
    }

    await addDoc(collection(db, "photos"), {
      imageUrl,
      caption,
      place,
      date,
      uploadedBy: "User",
      approved: false, // Default pending
      createdAt: new Date().toISOString()
    });

    alert("Photo uploaded! Waiting for Admin approval.");
    location.reload();
  };
}