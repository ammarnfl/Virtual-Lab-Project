// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Submit button
const register = document.getElementById('register');
register.addEventListener("click", function (event) {
  event.preventDefault()

  // Inputs
  const username = document.getElementById('username').value;
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      const userData = {
        username: username,
        fullname: fullname,
        email: email
      };
      alert("Akun Berhasil Dibuat!")
      window.location.href = "login.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})



// // Login requirement
// const loginForm = document.getElementById("loginForm");

// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   // Simulate Firebase Login
//   try {
//     const response = await fetch("https://your-backend-url.com/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) throw new Error("Login failed");

//     const data = await response.json();
//     alert("Login successful!");
//     // Redirect or save session token
//   } catch (err) {
//     alert(err.message);
//   }
// });
