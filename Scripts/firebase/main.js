export const firebaseConfig = {
  apiKey: "AIzaSyAQa7i4BLAvK6AEd1AXqGPt-zfL_bKJcpI",
  authDomain: "movies-app-196f6.firebaseapp.com",
  databaseURL: "https://movies-app-196f6-default-rtdb.firebaseio.com",
  projectId: "movies-app-196f6",
  storageBucket: "movies-app-196f6.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "1028699259925",
  appId: "1:1028699259925:web:6e31d0756155054db47a1c",
  measurementId: "G-5VC9SFLYL6",
};

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fs = getStorage(app);

// steal not finish;
export const setUsermessage = async function(name,email,message){
    setDoc(collection,'User Messages',{name:name,email:email,message:message});
}