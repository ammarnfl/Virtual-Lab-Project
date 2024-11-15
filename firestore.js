// Adding to database
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Logged in
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId')
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
    .then((docSnap) => {
      if(docSnap.exists()){
        const userData = docSnap.data();
        document.getElementById('username').innerText = userData.username;
      }
      else{
        console.log("No Document Found Matching ID")
      }
    })
    .catch((error) => {
      console.log("Error Getting Document")
    })
  } 
  else {
    console.log("User ID Not Found in Local Storage")
  }
});

// Logout
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
  .then(() => {
    window.location.href = "login.html";
  })
  .catch((error) => {
    console.error('Error Signing out:', error);
  })
});