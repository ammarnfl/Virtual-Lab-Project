import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

const logoutButton = document.getElementById("logout");

function logout() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
}

logoutButton.addEventListener("click", logout);