import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNbmkHVo6YAOk69h9OgMGbQJBUlW5xz4c",
  authDomain: "iedc-admin.firebaseapp.com",
  projectId: "iedc-admin",
  storageBucket: "iedc-admin.appspot.com",
  messagingSenderId: "200933316108",
  appId: "1:200933316108:web:8b5d08b6295d0962ec8029",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getFirestore(app);

// Function to display JSON data on the page
function displayData(data) {
  const jsonDisplay = document.getElementById("jsonDisplay");
  jsonDisplay.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Fetch document data based on ID from URL
async function fetchDocument(docId) {
  try {
    const docRef = doc(DB, "sih-hackathon-24", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      displayData(data);
    } else {
      console.log("No such document!");
      displayData({ error: "No document found for the given ID" });
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    displayData({ error: "Failed to fetch document" });
  }
}

// Get ID from URL and fetch data
const searchParams = new URLSearchParams(window.location.search);
const docId = searchParams.get("id");
if (docId) {
  fetchDocument(docId);
} else {
  displayData({ error: "No document ID provided in URL" });
}
