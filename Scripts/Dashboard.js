let input_img = document.getElementById('input-img');
let user_Profile = document.querySelectorAll('.User_img');

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file || !file.type.match('image.*')) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const imgSrc = event.target.result;
    user_Profile.forEach(el => el.src = imgSrc);
    localStorage.setItem('UserProfile', imgSrc);
  };
  reader.readAsDataURL(file);
}

input_img.addEventListener('change', handleFileSelect);

const savedImageSrc = localStorage.getItem('UserProfile');
if (savedImageSrc) {
  user_Profile.forEach(el => el.src = savedImageSrc);
} else {
  user_Profile.src = "./SRC/image/bgCover_Report.jpg";
}

let user_Name = document.querySelector('.user_Name');
let userName = localStorage.getItem('userName');
user_Name.innerHTML = userName;

// inputColrs changes
let Color_1 = document.getElementById('color-1');
Color_1.addEventListener('change', () => {
  console.log(Color_1.value);
  localStorage.setItem('firstColor', Color_1.value);
})
let Color_2 = document.getElementById('color-2');
Color_2.addEventListener('change', () => {
  console.log(Color_2.value);
  localStorage.setItem('SecondColor', Color_2.value);
})
let firstColor = localStorage.getItem('firstColor');
Color_1.value = firstColor;








