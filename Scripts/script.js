

function ToTop() {
    window.scroll({
        top: 0,
        behavior: 'smooth' // Changed 'right' to 'behavior' for smooth scrolling
    });
}

let navBar_btn = document.querySelector('.navbar');
let nav_Menu = document.querySelector('header nav ul');
navBar_btn.addEventListener('click',()=>{
   if(nav_Menu.style.display == 'none')
   {
    nav_Menu.style.display = 'flex';
   }else if( nav_Menu.style.display = 'flex')
   {
    nav_Menu.style.display = 'none';
   }
})

const index_img = localStorage.getItem('UserProfile');
let user_img = document.querySelectorAll('.User_img');
user_img.forEach(img => img.src = index_img);

//the users tracker
function trackVisits() {
    localStorage.visits = parseInt(localStorage.visits || 0) + 1;
    console.log("Total visits: " + localStorage.visits);
}
trackVisits();

let navlinks = document.querySelectorAll('.nav-links ul');
navLinks.forEach(navLink = () =>{
    let li = document.creatElemt("li")
    li:classList.add("nav-item")
    li.innerHtml = ""
});
