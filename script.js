// Dropdown menu functionality
document.addEventListener('DOMContentLoaded', (event) => {
  const dropBtn = document.querySelector('.dropbtn');
  const dropdownContent = document.querySelector('.dropdown-content');

  dropBtn.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropbtn')) {
      if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
      }
    }
  });
});

let genderIndex = 0;
const genders = ['male', 'female'];
const genderImages = {
  male: '/documentation/man.webp',
  female: '/documentation/woman.webp'
};

function prevGender() {
  genderIndex = (genderIndex - 1 + genders.length) % genders.length;
  updateGenderImage();
}

function nextGender() {
  genderIndex = (genderIndex + 1) % genders.length;
  updateGenderImage();
}

function updateGenderImage() {
  document.getElementById('gender-image').src = genderImages[genders[genderIndex]];
}

function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1); // Rumus BMI
    displayBMIResult(bmi);
}

function displayBMIResult(bmi) {
  const bmiValue = document.getElementById('bmiValue');
  const bmiDescription = document.getElementById('bmiDescription');
  
  let result = '';
  let color = '';

  if (bmi < 18.5) {
    result = 'Underweight';
    color = '#ffc107';
  } else if (bmi < 24.9) {
    result = 'Normal weight';
    color = '#28a745';
  } else if (bmi < 29.9) {
    result = 'Overweight';
    color = '#ff851b';
  } else {
    result = 'Obesity';
    color = '#dc3545';
  }

  bmiValue.innerText = `BMI: ${bmi}`;
  bmiDescription.innerText = result;
  bmiDescription.style.color = color;
}

function showInfo() {
  document.getElementById('info-modal').style.display = 'block';
}

function closeInfo() {
  document.getElementById('info-modal').style.display = 'none';
}

const canvas = document.getElementById('coordinateCanvas');
const ctx = canvas.getContext('2d');
let dragging = false;

// Titik awal
let point = {x: 150, y: 150};

// Dapatkan elemen input untuk berat dan tinggi badan
const heightInput = document.getElementById('heightInput');
const weightInput = document.getElementById('weightInput');
const sbY = {x: 100, y0 : 30, y1: 280};
const sbX = {y: sbY.y1, x0 : 100, x1: 300};


// Fungsi untuk menggambar koordinat kartesius dan titik yang dapat digeser
function drawCoordinates() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Gambar garis koordinat
  ctx.beginPath();
  ctx.moveTo(sbY.x, sbY.y0); // Sumbu Y
  ctx.lineTo(sbY.x, sbY.y1); // Vertikal dari bawah ke atas
  ctx.moveTo(sbX.x0, sbX.y); // Sumbu X dimulai dari bawah
  ctx.lineTo(sbX.x1, sbX.y); // Horizontal dari kiri ke kanan
  ctx.strokeStyle = '#4a4a4a';
  ctx.stroke();

  // Tambahkan label untuk sumbu X dan Y
  ctx.font = '14px Poppins';
  ctx.fillStyle = '#4a4a4a';
  ctx.fillText('Tinggi (cm)', sbX.x0 + 80, sbY.y1 + 50); // Label sumbu X
  ctx.fillText('Berat (kg)', sbX.x0-90, sbY.y0 + 130); // Label sumbu Y


  // Skala dan grid sumbu X (100 cm - 200 cm)
  for (let i = 100; i <= 250; i += 30) {
    let x = mapRange(i, 100, 250, sbX.x0, sbX.x1); // Konversi skala tinggi
    ctx.fillText(i, x, sbY.y1+20); // Label skala tinggi badan
    ctx.moveTo(x, sbY.y1+5);
    ctx.lineTo(x, sbY.y1); // Garis kecil skala X
  }

  // Skala dan grid sumbu Y (20 kg - 170 kg)
  for (let i = 20; i <= 170; i += 30) {
    let y = mapRange(i, 20, 170, sbY.y1, sbY.y0); // Konversi skala berat badan
    ctx.fillText(i, sbX.x0-30, y + 5); // Label skala berat badan
    ctx.moveTo(sbX.x0, y);
    ctx.lineTo(sbX.x0-5, y); // Garis kecil skala Y
  }
  ctx.stroke();

  // Gambar titik yang dapat digeser
  ctx.beginPath();
  ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#82c4c3';
  ctx.fill();

  // Update nilai input berdasarkan posisi titik
  updateInputsFromPoint();
}

// Fungsi untuk memetakan nilai dari satu skala ke skala lain
function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Fungsi untuk memperbarui nilai input berdasarkan posisi titik
function updateInputsFromPoint() {
  const height = Math.round(mapRange(point.x, sbX.x0, sbX.x1, 100, 250));
  const weight = Math.round(mapRange(point.y, sbY.y1, sbY.y0, 20, 170));
  
  heightInput.value = height;
  weightInput.value = weight;
}

// Fungsi untuk memperbarui titik berdasarkan nilai input
function updatePointFromInputs() {
  const height = parseInt(heightInput.value);
  const weight = parseInt(weightInput.value);
  console.log(height, weight);

  point.x = mapRange(height, 100, 250, sbX.x0, sbX.x1,);
  point.y = mapRange(weight, 20, 170, sbY.y1, sbY.y0);

  drawCoordinates();
}

// Event listener untuk drag and drop titik
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Jika klik dekat dengan titik, aktifkan dragging
  if (Math.abs(mouseX - point.x) < 10 && Math.abs(mouseY - point.y) < 10) {
    dragging = true;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (dragging) {
    const rect = canvas.getBoundingClientRect();
    let newX = e.clientX - rect.left;
    let newY = e.clientY - rect.top;

    // Batas nilai x (100 - 200 cm) dan y (20 - 170 kg)
    if (newX >= sbX.x0 && newX <= sbX.x1 && newY >= sbY.y0 && newY <= sbY.y1) {
      point.x = newX;
      point.y = newY;
      drawCoordinates();
    }
  }
});

canvas.addEventListener('mouseup', () => {
  dragging = false;
});

// Hitung skala canvas
function getCanvasScale() {
  const rect = canvas.getBoundingClientRect();
  return {
      scaleX: canvas.width / rect.width,
      scaleY: canvas.height / rect.height
  };
}

// Event listener untuk drag and drop titik dengan touch
canvas.addEventListener('touchstart', (e) => {
  const rect = canvas.getBoundingClientRect();
  const scale = getCanvasScale();
  const touchX = (e.touches[0].clientX - rect.left) * scale.scaleX;
  const touchY = (e.touches[0].clientY - rect.top) * scale.scaleY;

  // Jika sentuh dekat dengan titik, aktifkan dragging
  if (Math.abs(touchX - point.x) < 10 && Math.abs(touchY - point.y) < 10) {
    dragging = true;
    e.preventDefault(); // Mencegah halaman scroll
  }
});

canvas.addEventListener('touchmove', (e) => {
  if (dragging) {
    const rect = canvas.getBoundingClientRect();
    const scale = getCanvasScale();
    let newX = (e.touches[0].clientX - rect.left) * scale.scaleX;
    let newY = (e.touches[0].clientY - rect.top) * scale.scaleY;

    // Batas nilai x (100 - 200 cm) dan y (20 - 170 kg)
    if (newX >= sbX.x0 && newX <= sbX.x1 && newY >= sbY.y0 && newY <= sbY.y1) {
      point.x = newX;
      point.y = newY;
      drawCoordinates();
    }
    e.preventDefault(); // Mencegah halaman scroll
  }
});

canvas.addEventListener('touchend', () => {
  dragging = false;
});

// Event listener untuk input manual
heightInput.addEventListener('input', updatePointFromInputs);
weightInput.addEventListener('input', updatePointFromInputs);

drawCoordinates();


function updateGenderImage() {
    const genderImage = document.getElementById('gender-image');
    genderImage.classList.add('switched');
    setTimeout(() => {
      genderImage.src = genderImages[genders[genderIndex]];
      genderImage.classList.remove('switched');
    }, 200); // Waktu yang sinkron dengan animasi
  }
