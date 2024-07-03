

function ToTop() {
    window.scroll({
        top: 0,
        behavior: 'smooth' // Changed 'right' to 'behavior' for smooth scrolling
    });
}

let nav_btn = document.querySelector('.navbar');
let nav_Men = document.querySelector('header nav ul');
nav_btn.addEventListener('click',()=>{
   if(nav_Men.style.display == 'none')
   {
    nav_Men.style.display = 'flex';
   }else if( nav_Men.style.display = 'flex')
   {
    nav_Men.style.display = 'none';
   }
})

const index_img = localStorage.getItem('UserProfile');
let user_img = document.querySelectorAll('.User_img');
user_img.forEach(img => img.src = index_img);

// function to handel the click event on the hear btn 
let hearts = document.querySelectorAll('.fa-heart');
hearts.forEach(heart =>{
    heart.addEventListener('click',()=>{
        heart.style.Color = 'red';
    })
})