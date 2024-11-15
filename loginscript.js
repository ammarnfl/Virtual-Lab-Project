// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn_DXgJZTBXFOL7FtF2TNbPv3Jmh8Es4Y",
  authDomain: "virtual-lab-project.firebaseapp.com",
  projectId: "virtual-lab-project",
  storageBucket: "virtual-lab-project.firebasestorage.app",
  messagingSenderId: "400854323817",
  appId: "1:400854323817:web:b7efe2ac244034a56e48f8",
  measurementId: "G-G90H1N4JVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Submit button
const Login = document.getElementById('login');
login.addEventListener("click", function (event) {
  event.preventDefault()

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Berhasil Login!")
      window.location.href = "index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Password Salah!")
      // ..
    });
})