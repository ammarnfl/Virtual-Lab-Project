// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBn_DXgJZTBXFOL7FtF2TNbPv3Jmh8Es4Y",
  authDomain: "virtual-lab-project.firebaseapp.com",
  projectId: "virtual-lab-project",
  storageBucket: "virtual-lab-project.firebasestorage.app",
  messagingSenderId: "400854323817",
  appId: "1:400854323817:web:b7efe2ac244034a56e48f8",
  measurementId: "G-G90H1N4JVJ",
  databaseURL: "https://virtual-lab-project-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
const login = document.getElementById('login');
login.addEventListener("click", function (event) {
  event.preventDefault()

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      showMessage("Login Berhasil!", "loginMessage");
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "index.html";
      // alert("Berhasil Login!")
    })
    .catch((error) => {
      const errorCode = error.code;
      if(errorCode == 'auth/invalid-credential'){
        showMessage("Incorrect Email or Password", "loginMessage");
      }else{
        showMessage("Account does not Exist! Register First", "loginMessage");
      }
    });
})