// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrJdGxfmk0XEpleqJeYpQgmEZmn_JLWK4",
  authDomain: "virtual-lab-6eebc.firebaseapp.com",
  projectId: "virtual-lab-6eebc",
  storageBucket: "virtual-lab-6eebc.firebasestorage.app",
  messagingSenderId: "275454075025",
  appId: "1:275454075025:web:9e9598605bc8598fbbdf30",
  measurementId: "G-ESM3SVQECN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);


// Submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Akun Berhasil Dibuat!")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
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
