
let input_img = document.getElementById('input-img');
let user_img = document.querySelectorAll('.User_img');
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file || !file.type.match('image.*')) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgSrc = event.target.result;
        user_img.forEach(el =>{el.src = imgSrc;})
        localStorage.setItem('UserProfile', imgSrc);
    };
    reader.readAsDataURL(file);
}
input_img.addEventListener('change', handleFileSelect);

const savedImageSrc = localStorage.getItem('UserProfile');
if (savedImageSrc) {
    user_img.forEach(el =>{el.src = savedImageSrc;})
}

