// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPhone = document.getElementById('userPhone').value;
    const userMessage = document.getElementById('ContactText').value;

    set(ref(db, 'Users/' + name), {
       userlastName: lastName,
       userEmail: userEmail,
       userPhone: userPhone, 
       userMessage: userMessage
    });
    alert('The data was sent successfully!');
});

 // * Retrive the data from firebase database
 //"Once" method dosn't change the data when ever ther is a change o the database
 //"On" method  change the data when ever ther is a change o the database
 // "val()" used to trager the value of the data
 // "key" used to trager the Key of the data
var firbaseRef = firebase.database().ref("users");
firbaseRef.once('value',(snapshot)=>{
  const data = snapshot;
  data.forEach(ele =>{
     console.log(ele.val());
  })
})
