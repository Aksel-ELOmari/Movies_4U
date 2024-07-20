function ToTop() {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
}

let nav_btn = document.querySelector('.navbar');
let nav_Men = document.querySelector('header nav ul');
nav_btn.addEventListener('click', () => {
    if (nav_Men.style.display === 'none') {
        nav_Men.style.display = 'flex';
    } else {
        nav_Men.style.display = 'none';
    }
});

const index_img = localStorage.getItem('UserProfile');
let user_img = document.querySelectorAll('.User_img');
user_img.forEach(img => img.src = index_img);

// Function to handle the click event on the heart button
let hearts = document.querySelectorAll('.fa-heart');
hearts.forEach(heart => {
    heart.addEventListener('click', () => {
        heart.style.color = 'red';
    });
});
