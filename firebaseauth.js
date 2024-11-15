// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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
// const auth = getAuth(app);
const analytics = getAnalytics(app);


// Register button
const register = document.getElementById('register');
register.addEventListener('click', function (event) {
  event.preventDefault();

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Akun Berhasil Dibuat!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})

// Login button
const login = document.getElementById('login');
login.addEventListener('click', function (event) {
  event.preventDefault();

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const auth = getAuth();
  
  signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      // Signed In
      const user = userCredential.user;
      alert("Berhasil Login!")
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Password Salah!")
    });
});




// // Pop up message
// function showMessage(message, divId){
//     var messageDiv=document.getElementById(divId);
//     messageDiv.style.display="block";
//     messageDiv.innerHTML=message;
//     messageDiv.style.opacity=1;
//     setTimeout(function(){
//         messageDiv.style.opacity=0;
//     },5000);
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// const analytics = getAnalytics(app);


// const register = document.getElementById('register');
// register.addEventListener('click', function(event) {
//    event.preventDefault();
//    const email=document.getElementById('email').value;
//    const password=document.getElementById('password').value;
// //    const firstName=document.getElementById('fName').value;
// //    const lastName=document.getElementById('lName').value;

//    const auth=getAuth();
//    const db=getFirestore();

//    createUserWithEmailAndPassword(auth, email, password)
//    .then((userCredential)=>{
//        const user=userCredential.user;
//     //    const userData={
//     //        email: email,
//     //        firstName: firstName,
//     //        lastName:lastName
//     //    };
//        showMessage('Account Created Successfully', 'signUpMessage');
//        const docRef=doc(db, "users", user.uid);
//        setDoc(docRef,userData)
//        .then(()=>{
//            window.location.href='index.html';
//        })
//        .catch((error)=>{
//            console.error("error writing document", error);

//        });
//    })
//    .catch((error)=>{
//        const errorCode=error.code;
//        if(errorCode=='auth/email-already-in-use'){
//            showMessage('Email Address Already Exists !!!', 'signUpMessage');
//        }
//        else{
//            showMessage('unable to create User', 'signUpMessage');
//        }
//    })
// });

// const login = document.getElementById('login');
// login.addEventListener('click', function(event) {
//    event.preventDefault();
//    const email=document.getElementById('email').value;
//    const password=document.getElementById('password').value;
//    const auth=getAuth();

//    signInWithEmailAndPassword(auth, email,password)
//    .then((userCredential)=>{
//        showMessage('login is successful', 'signInMessage');
//        const user=userCredential.user;
//        localStorage.setItem('loggedInUserId', user.uid);
//        window.location.href='homepage.html';
//    })
//    .catch((error)=>{
//        const errorCode=error.code;
//        if(errorCode==='auth/invalid-credential'){
//            showMessage('Incorrect Email or Password', 'signInMessage');
//        }
//        else{
//            showMessage('Account does not Exist', 'signInMessage');
//        }
//    })
// })