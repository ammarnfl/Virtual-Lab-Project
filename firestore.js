// Adding to cloud firestore and realtime database
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
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
const auth = getAuth();

// 
// CLOUD FIRESTORE CONFIGURATION
// 
const cloud = getFirestore();
// Logged in
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId')
  if (loggedInUserId) {
    const docRef = doc(cloud, "users", loggedInUserId);
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

// 
// REALTIME DATABASE CONFIGURATION
// 
const db = getDatabase();

let username = userData.username;
let email = userData.email;
let fullname = userData.fullname;

let infobtn = document.getElementById('infobtn');
let editProfile = document.getElementById('editprofile');
let logOut = document.getElementById('logout');
let changeGender = document.getElementById('changegender');
let coordinateCanvas = document.getElementById('coordinateCanvas');
let heightInput = document.getElementById('heightInput');
let weightInput = document.getElementById('weightInput');
let count = document.getElementById('count');
let bmiValue = document.getElementById('bmiValue');
let bmiDescription = document.getElementById('bmiDescription');
let articles = document.getElementsByClassName('article');

function AddData(){
  set(ref(db, 'UserSet/' + userData.email), {
    email: email,
    username: username,
    fullname: fullname,
    height: heightInput,
    weight: weightInput,
    value: bmiValue,
    description: bmiDescription
  })
  .then(()=>{
    alert("Data Added Successfully");
  })
  .catch((error) => {
    alert("Failed");
    console.log(error);
  })
}

function getData(){
  const dbRef = ref(db);

  get(child(dbRef, 'UserSet/' + userData.email)).then((snapshot) => {
    if(snapshot.exists()){
      email.value = snapshot.val().email;
      username.value = snapshot.val().username;
      fullname.value = snapshot.val().fullname;
      heightInput.value = snapshot.val().height;
      weightInput.value = snapshot.val().weight;
      bmiValue.value = snapshot.val().value;
      bmiDescription.value = snapshot.val().description;
    }
    else{
      alert("User does not exist");
    }
  })
  .catch((error) => {
    alert("Failed");
    console.log(error);
  })
}

function UpdateData(){
  update(ref(db, 'UserSet/' + userData.email), {
    username: username,
    fullname: fullname,
    height: heightInput,
    weight: weightInput,
    value: bmiValue,
    description: bmiDescription
  })
  .then(()=>{
    alert("Data Updated Successfully");
  })
  .catch((error) => {
    alert("Failed!");
    console.log(error);
  })
}

function DeleteData(){
  remove(ref(db, 'UserSet/' + userData.email))
  .then(()=>{
    alert("Account Deleted Successfully");
  })
  .catch((error) => {
    alert("Failed!");
    console.log(error);
  })
}