// Import Firebase modules using full paths
import { firebaseConfig } from "./main.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

// Register form elements
const nameInput = document.querySelector('#user_name');
const emailInput = document.querySelector("#user_email");
const passwordInput = document.querySelector("#user_password");
function loginUser(){
  const Login_btn = document.getElementById('Login_btn');
  if(!Login_btn) return;
  Login_btn.onclick =_=> async function () {
    try {
      const email = emailInput.value;
      const password = passwordInput.value;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("The user successfully logged in:" + user);
    } catch (error) {
      console.error("Username or password is incorrect:", error);
    }
  };
}
function signUpUser(){
    const singUp_btn = document.getElementById('SingUp_btn');
    if(!singUp_btn) return;
    singUp_btn.onclick = async function () {
    try {
      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );
      console.log(`A new user successfully signed up: ${userCredential.user}`);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.name,
      });
      console.log("User data saved to Firestore.");
    } catch (error) {
      console.error(error);
    }
  };
}
const logoutUser = function () {
  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn
    ? (logoutBtn.onclick = function () {
        signOut(auth)
          .then(() => {
            console.log("User successfully logged out.");
          })
          .catch((error) => {
            console.error("Error logging out:", error);
          });
      })
    : "";
};
const GoogleSignin = function () {
  function activeGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(
          `The user ${user.displayName} successfully logged in with Google.`,
        );
      })
      .catch((error) => {
        console.error(
          "Sorry, there was an error signing in with Google:",
          error,
        );
      });
  }
  const loginGoogleBtn = document.querySelector(".google-btn");
  loginGoogleBtn ? (loginGoogleBtn.onclick = activeGoogle) : "";
};

///
loginUser();
signUpUser();
logoutUser();
GoogleSignin();
