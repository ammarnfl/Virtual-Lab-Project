import { getApps, getApp, initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBn_DXgJZTBXFOL7FtF2TNbPv3Jmh8Es4Y",
  authDomain: "virtual-lab-project.firebaseapp.com",
  projectId: "virtual-lab-project",
  storageBucket: "virtual-lab-project.firebasestorage.app",
  messagingSenderId: "400854323817",
  appId: "1:400854323817:web:b7efe2ac244034a56e48f8",
  measurementId: "G-G90H1N4JVJ",
  databaseURL: "https://virtual-lab-project-default-rtdb.firebaseio.com"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

function logActivity(buttonId, additionalData = {}) {
  if (!currentUser) {
    console.error("No user logged in");
    return;
  }

  const activityData = {
    userId: currentUser.uid,
    email: currentUser.email, 
    buttonId: buttonId,
    timestamp: serverTimestamp(),
    ...additionalData
  };

  push(ref(db, 'UserActivities'), activityData)
    .then(() => console.log("Activity logged successfully"))
    .catch((error) => console.error("Error logging activity:", error));
}

// Event listeners for various activities
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login');
  if (loginButton) {
    loginButton.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('email')?.value;
      logActivity('login', { email });
    });
  }

  // Logout
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => logActivity('logout'));
  }

  // BMI Calculation
  const calculateButton = document.getElementById('count');
  if (calculateButton) {
    calculateButton.addEventListener('click', () => {
      const weight = document.getElementById('weightInput')?.value;
      const height = document.getElementById('heightInput')?.value;
      const bmiValue = document.getElementById('bmiValue')?.textContent;
      const bmiDescription = document.getElementById('bmiDescription')?.textContent;
      
      logActivity('bmiCalculation', {
        weight,
        height,
        bmiValue,
        bmiDescription,
        gender: document.getElementById('gender-image')?.alt || 'Male'
      });
    });
  }

  const profileForm = document.getElementById('saveProfile');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedData = {
        username: document.getElementById('username')?.value,
        firstName: document.getElementById('firstName')?.value,
        lastName: document.getElementById('lastName')?.value,
        gender: document.getElementById('gender')?.value,
        height: document.getElementById('height')?.value,
        weight: document.getElementById('weight')?.value
      };
      logActivity('profileUpdate', updatedData);
    });
  }

  // Track article clicks
  const articles = document.querySelectorAll('.article a');
  articles.forEach((article) => {
    article.addEventListener('click', (e) => {
      const articleId = article.id;
      const articleTitle = article.closest('.article').querySelector('p')?.textContent;
      logActivity('articleAccess', {
        articleId,
        articleTitle,
        url: article.href
      });
    });
  });
});

export { logActivity };