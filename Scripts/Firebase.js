const firebaseConfig = {
  apiKey: "AIzaSyAtxMMHXCApK15w67sd6bLuOgp7C2xeUMo",
  authDomain: "movies-app-196f6.firebaseapp.com",
  projectId: "movies-app-196f6",
  storageBucket: "movies-app-196f6.appspot.com",
  messagingSenderId: "1028699259925",
  appId: "1:1028699259925:web:924093d0d0472068b47a1c",
  measurementId: "G-RYNCLSM3HS"
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);


// Login // Register Functions
const loginUser = async function () {
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("user_password").value
  const LoginBtn = document.getElementById("login-btn");
  email&&password&&LoginBtn
    ? (LoginBtn.onclick = async function () {
        try {
          // Log in the user with Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;
          window.location.href = "index.html";
        } catch (error) {
          console.error("user name or password is an correct?:", error);
          return { success: false, error: error.message };
        }
      })
    : "";
};
loginUser();
const registerUser = async function () {
  const email = document.getElementById("new_userEmail").value
  const password = document.getElementById("new_user_password").value
  const name = document.getElementById("new_name").value
  const SingUpBtn = document.getElementById("Sing-btn");
  SingUpBtn&&password&&name&&email
    ? (SingUpBtn.onclic = async function () {
        try {
          // Register the user with Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;
          alert('Welcome To Movies_4U, Have Fun !!!');
          window.location.href = "index.html";
          // Save user data to Firestore
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            name: name,
          });
          console.log("User data saved to Firestore.");
          return { success: true, user };
        } catch (error) {
          console.error(
            `Error registering ghe user: [${errorCode}] ${errorMessage}`,
          );
          return { success: false, error: errorMessage };
        }
      })
    : "";
};
registerUser();
// Authenticate user and upload profile picture
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const photoURL = user.photoURL; // Get the user's Google account profile photo URL
    try {
      const firebasePhotoURL = await uploadProfilePhotoToStorage(photoURL);
      // Display the image
      const userProfile = document.querySelectorAll(".user-profile",".top-user-cover");
      userProfile? userProfile.forEach((img) => {img.src = firebasePhotoURL;}): "";
    } catch (error) {
      console.error("Error processing profile photo:", error);
    }
  } else {
    console.log("No user is signed in.");
  }
});
export function isUserIn() {
  onAuthStateChanged(auth, (user) => {
     user?console.log(`the user ${user.displayName} is singed in.`):'';
  });
}
isUserIn();