document.addEventListener('DOMContentLoaded', function() {
  const profileView = document.getElementById('profileView');
  const editProfileForm = document.getElementById('editProfileForm');
  const editButton = document.getElementById('editButton');
  const cancelButton = document.getElementById('cancelButton');
  const profilePictureInput = document.getElementById('profilePicture');
  const profilePicturePreview = document.getElementById('profilePicturePreview').querySelector('img');
  const currentProfilePicture = document.getElementById('currentProfilePicture');

  // Mock user data (replace with actual data fetching in a real application)
  const userData = {
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    height: 175,
    weight: 70,
    profilePicture: '/placeholder.svg?height=200&width=200'
  };

  // Populate view mode
  function populateViewMode() {
    document.getElementById('viewUsername').textContent = userData.username;
    document.getElementById('viewFullName').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('viewGender').textContent = userData.gender;
    document.getElementById('viewHeight').textContent = userData.height;
    document.getElementById('viewWeight').textContent = userData.weight;
    currentProfilePicture.src = userData.profilePicture;
  }

  // Populate edit form
  function populateEditForm() {
    document.getElementById('username').value = userData.username;
    document.getElementById('firstName').value = userData.firstName;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('gender').value = userData.gender;
    document.getElementById('height').value = userData.height;
    document.getElementById('weight').value = userData.weight;
    profilePicturePreview.src = userData.profilePicture;
  }

  // Switch to edit mode
  editButton.addEventListener('click', function() {
    profileView.style.display = 'none';
    editProfileForm.style.display = 'block';
    populateEditForm();
  });

  // Cancel edit and return to view mode
  cancelButton.addEventListener('click', function() {
    profileView.style.display = 'block';
    editProfileForm.style.display = 'none';
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
    
    // Here you would typically send the form data to your server
    // For now, we'll just update the mock userData and refresh the view
    userData.username = document.getElementById('username').value;
    userData.firstName = document.getElementById('firstName').value;
    userData.lastName = document.getElementById('lastName').value;
    userData.gender = document.getElementById('gender').value;
    userData.height = document.getElementById('height').value;
    userData.weight = document.getElementById('weight').value;
    userData.profilePicture = profilePicturePreview.src;

    populateViewMode();
    profileView.style.display = 'block';
    editProfileForm.style.display = 'none';

    alert('Profile updated successfully!');
  });

  // Initial population of view mode
  populateViewMode();
});