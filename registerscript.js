// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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
const db = getDatabase(app);
// const db = getFirestore(app);

function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout( function() { 
      messageDiv.style.opacity = 0;
  }, 5000);
}

// Submit button
const register = document.getElementById('register');
register.addEventListener("click", function (event) {
  event.preventDefault()

  // Inputs
  const username = document.getElementById('username').value;
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      const userData = {
        username: username,
        fullname: {firstname, lastname},
        email: email,
        password: password
      };
      // alert("Akun Berhasil Dibuat!")
      showMessage("Akun Berhasil Dibuat!", "registerMessage");

      // Adding to realtime database
      set(ref(db, 'UserProfile/' + user.uid), {
        username: userData.username,
        fullname: userData.fullname,
        email: userData.email,
        password: userData.password,
      })
      .then(() => {
        window.location.href = "login.html";
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        showMessage("Email Sudah Digunakan!!", "registerMessage")
      }
      else {
        showMessage("Tidak Bisa Membuat User", "registerMessage")
      }
    })
});