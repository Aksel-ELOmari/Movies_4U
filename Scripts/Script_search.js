let filters = [];
let chosenGenre = document.querySelector('.this-genre');
let Search_Alt = document.querySelector('.MovieSectionAlt');
let nav__link  = document.querySelectorAll('.UL__genres li a');
 nav__link.forEach(el => {
    el.addEventListener('click',()=>{
        // console.log(el);
        Search_Alt.innerHTML = 'Search Results';
        chosenGenre.id = '';
        chosenGenre.id = el.id;
        chosenGenre.innerHTML = '';
        chosenGenre.innerHTML = el.innerHTML;
        chosenGenre.classList.add('irgha');
        for(let a = 0; a<filters.length;a++){
            filters[a].classList.remove('irgha');
        }
        el.classList.add('irgha');
        filters.push(el);
    })
})

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
