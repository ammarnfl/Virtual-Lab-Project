let genderIndex = 0;
const genders = ['male', 'female'];
const genderImages = {
  male: 'male.png',
  female: 'female.png'
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
let point = { x: 150, y: 150 };

// Dapatkan elemen input untuk berat dan tinggi badan
const heightInput = document.getElementById('heightInput');
const weightInput = document.getElementById('weightInput');

// Fungsi untuk menggambar koordinat kartesius dan titik yang dapat digeser
function drawCoordinates() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar garis koordinat
  ctx.beginPath();
  ctx.moveTo(50, 0); // Sumbu Y
  ctx.lineTo(50, 300); // Vertikal dari bawah ke atas
  ctx.moveTo(50, 250); // Sumbu X dimulai dari bawah
  ctx.lineTo(300, 250); // Horizontal dari kiri ke kanan
  ctx.strokeStyle = '#4a4a4a';
  ctx.stroke();

  // Tambahkan label untuk sumbu X dan Y
  ctx.font = '14px Poppins';
  ctx.fillStyle = '#4a4a4a';
  ctx.fillText('Tinggi (cm)', 170, 270); // Label sumbu X
  ctx.fillText('Berat (kg)', 10, 130); // Label sumbu Y

  // Skala dan grid sumbu X (100 cm - 200 cm)
  for (let i = 100; i <= 200; i += 20) {
    let x = mapRange(i, 100, 200, 50, 300); // Konversi skala tinggi
    ctx.fillText(i, x, 265); // Label skala tinggi badan
    ctx.moveTo(x, 250);
    ctx.lineTo(x, 245); // Garis kecil skala X
  }

  // Skala dan grid sumbu Y (20 kg - 170 kg)
  for (let i = 20; i <= 170; i += 30) {
    let y = mapRange(i, 20, 170, 250, 0); // Konversi skala berat badan
    ctx.fillText(i, 15, y + 5); // Label skala berat badan
    ctx.moveTo(50, y);
    ctx.lineTo(55, y); // Garis kecil skala Y
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
  const height = Math.round(mapRange(point.x, 50, 300, 100, 200));
  const weight = Math.round(mapRange(point.y, 250, 0, 20, 170));
  
  heightInput.value = height;
  weightInput.value = weight;
}

// Fungsi untuk memperbarui titik berdasarkan nilai input
function updatePointFromInputs() {
  const height = parseInt(heightInput.value);
  const weight = parseInt(weightInput.value);

  point.x = mapRange(height, 100, 200, 50, 300);
  point.y = mapRange(weight, 20, 170, 250, 0);

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
    if (newX >= 50 && newX <= 300 && newY >= 0 && newY <= 250) {
      point.x = newX;
      point.y = newY;
      drawCoordinates();
    }
  }
});

canvas.addEventListener('mouseup', () => {
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
    }, 400); // Waktu yang sinkron dengan animasi
  }
  