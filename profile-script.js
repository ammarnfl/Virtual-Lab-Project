// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
  const profileView = document.getElementById('profileView');
  const editProfileForm = document.getElementById('editProfileForm');
  const editButton = document.getElementById('editButton');
  const cancelButton = document.getElementById('cancelButton');
  const profilePictureInput = document.getElementById('profilePicture');
  const profilePicturePreview = document.getElementById('profilePicturePreview').querySelector('img');
  const currentProfilePicture = document.getElementById('currentProfilePicture');

  // Elements for the confirmation dialog
  const confirmationDialog = document.getElementById('confirmationDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogMessage = document.getElementById('dialogMessage');
  const confirmButton = document.getElementById('confirmButton');
  const cancelDialogButton = document.getElementById('cancelButtonDialog');

  // const userData = {
  //   username: 'johndoe',
  //   fullname: {firstName: 'John', lastName: 'Doe'},
  //   gender: 'male',
  //   height: 175,
  //   weight: 70,
  //   profilePicture: '/placeholder.svg?height=200&width=200'
  // };

  let userData = {};
  let currentUser = null;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      loadUserData(user.uid);
    } else {
      // User is signed out, redirect to login page
      window.location.href = "login.html";
    }
  });

  function loadUserData(userId) {
    get(ref(db, 'UserProfile/' + userId)).then((snapshot) => {
      if (snapshot.exists()) {
        userData = snapshot.val();
        populateViewMode();
        populateEditForm();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  function showConfirmationDialog(title, message, onConfirm) {
    dialogTitle.textContent = title;
    dialogMessage.textContent = message;
    confirmationDialog.style.display = 'block';

    confirmButton.onclick = () => {
      onConfirm();
      confirmationDialog.style.display = 'none';
    };

    cancelDialogButton.onclick = () => {
      confirmationDialog.style.display = 'none';
    };
  }

  // Populate view mode
  function populateViewMode() {
    document.getElementById('viewUsername').textContent = userData.username || '';
    document.getElementById('viewFullName').textContent = `${userData.fullname.firstname || ''} ${userData.fullname.lastname || ''}`;
    document.getElementById('viewGender').textContent = userData.gender || '';
    document.getElementById('viewHeight').textContent = userData.height || '';
    document.getElementById('viewWeight').textContent = userData.weight || '';
    currentProfilePicture.src = userData.profilePicture || '/placeholder.svg?height=200&width=200';
  }

  // Populate edit form
  function populateEditForm() {
    document.getElementById('username').value = userData.username || '';
    document.getElementById('firstName').value = userData.fullname.firstname || '';
    document.getElementById('lastName').value = userData.fullname.lastname || '';
    document.getElementById('gender').value = userData.gender || 'male';
    document.getElementById('height').value = userData.height || '';
    document.getElementById('weight').value = userData.weight || '';
    profilePicturePreview.src = userData.profilePicture || '/placeholder.svg?height=200&width=200';
  }

  // Switch to edit mode
  editButton.addEventListener('click', function() {
    profileView.style.display = 'none';
    editProfileForm.style.display = 'block';
    populateEditForm();
  });

  // Cancel edit and return to view mode
  cancelButton.addEventListener('click', function() {
    showConfirmationDialog(
      'Cancel Changes',
      'Are you sure you want to cancel? Any unsaved changes will be lost.',
      function() {
        profileView.style.display = 'block';
        editProfileForm.style.display = 'none';
      }
    );
  });

  // Handle profile picture preview
  profilePictureInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePicturePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form submission
  editProfileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    showConfirmationDialog(
      'Save Changes',
      'Are you sure you want to save these changes?',
      function() {
        const updatedUserData = {
          username: document.getElementById('username').value,
          fullname: {
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value
          },
          gender: document.getElementById('gender').value,
          height: document.getElementById('height').value,
          weight: document.getElementById('weight').value,
          profilePicture: profilePicturePreview.src
        };

        update(ref(db, 'UserProfile/' + currentUser.uid), updatedUserData)
          .then(() => {
            userData = updatedUserData;
            populateViewMode();
            profileView.style.display = 'block';
            editProfileForm.style.display = 'none';
            alert('Profile updated successfully!');
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            alert('Failed to update profile. Please try again.');
          });
      }
    );
  });
});