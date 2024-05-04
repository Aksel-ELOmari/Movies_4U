
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase,ref,set,get,child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyAtxMMHXCApK15w67sd6bLuOgp7C2xeUMo",
  authDomain: "movies-app-196f6.firebaseapp.com",
  projectId: "movies-app-196f6",
  storageBucket: "movies-app-196f6.appspot.com",
  messagingSenderId: "1028699259925",
  appId: "1:1028699259925:web:924093d0d0472068b47a1c",
  measurementId: "G-RYNCLSM3HS"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// get the ref from the database service
const db = getDatabase(app);
const submit_btn = document.getElementById('submit-btn');
submit_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    set(ref(db,'user/' + document.getElementById('name').value),
    {
       userName:document.getElementById('name').value,
       userlastName:document.getElementById('lastName').value,
       userEmail:document.getElementById('userEmail').value,
       userPhone:document.getElementById('userPhone').value, 
       userMessage:document.getElementById('ContactText').value, // User Message
    })
    alert('the data was sent successfully !!!!');
})


console.log(app)
