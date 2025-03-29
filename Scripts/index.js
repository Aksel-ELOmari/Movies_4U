// ! Local Imports
import { TMDB, fetchMedia} from "./fetcher.js";
var page = TMDB.page;
import { firebaseConfig } from "./firebase/main.js";
import {getAuth,onAuthStateChanged,}from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getStorage,ref,getDownloadURL,uploadBytes} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
// fetching the Page Name
const fullPath = window.location.pathname;
export const pageName = fullPath.substring(fullPath.lastIndexOf("/") + 1);
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(function(){
  // displaying the default cards
  const rated_plac = document.querySelector('.rated .countainer-inner');
  const Pop_plac = document.querySelector('.Popular .countainer-inner');
  if (pageName == "Series.html") {
    fetchMedia('tv/top_rated?language=en-US',rated_plac, page);
    fetchMedia('tv/popular?language=en-US',Pop_plac, page);
  }
  else{
      fetchMedia(TMDB.Rated_Url,rated_plac, page);
      fetchMedia(TMDB.POP_URL,Pop_plac, page);
  }

  // show the user data
  const nav_profile_after = document.querySelector('.nav_profile_after');
  const User_img = document.querySelector('.User_img');
  User_img.onmouseenter = _=>nav_profile_after.classList.remove('d-none');
  User_img.onmouseleave = _=>nav_profile_after.classList.add('d-none');
  nav_profile_after.onmouseleave = _=>nav_profile_after.classList.add('d-none');
  nav_profile_after.onmouseenter = _=>nav_profile_after.classList.remove('d-none');
})();
  // Track the user's authentication status
async function UserStatus() {
    const UserProfiles = document.querySelectorAll(".navUser-img .User_img");
       onAuthStateChanged(auth, (user) => {
          if(user){
              const photoURL = user.photoURL;
              UserProfiles.forEach((img) => {img.classList.remove("d-none");img.src = '';img.src = photoURL});
          }else{
              UserProfiles.forEach((img) => img.classList.add("d-none"));
          };
      });
  
}
UserStatus();
export function toggleElement(btn) {
  btn
    ? btn.addEventListener("click", () => {
        const el_class = btn.getAttribute("data-target");
        const el_target = document.querySelector(`.${el_class}`);
        if (el_target) {
          el_target.classList.toggle("d-none");
        } else {
          console.error("Sorry we could not find the item !!!");
        }
      })
    : "";
}
let ex_btn_array = ["hide-overly-btn", "watch-btn"];
ex_btn_array.forEach((btn) => {
  const ex_btn = document.querySelector(`.${btn}`);
  ex_btn
    ? ex_btn.addEventListener("click", () => {
        toggleElement(ex_btn);
      })
    : false;
});
export function toggleTwoElements(btn, el1, el2) {
  btn.addEventListener("click", () => {
    el1.classList.toggle("d-none");
    el2.classList.toggle("d-none");
  });
}
(function toggleNavBar(){
  // id="navbar" data-target="nav-links"
  const nav_btn = document.getElementById('navbar');
  const nav_links = document.querySelector('.nav-links');
  if(!nav_btn)return;
  nav_links.onclick = nav_links.style.display = 'block';
})();
// Displaying the genres sections
function DisplaySections() {
  const media = pageName == "Series.html" ? "tv" : "movie";
  console.log(media);
  const api = `discover/${media}?language=en-US`;
  const Sections = document.querySelectorAll(".genre-section");
  Sections.forEach((S) => {
    const GR = S.getAttribute("data-list-id");
    const plac = S.querySelector(`.CarouselSlider-inner`);
    GR ? fetchMedia(api, plac, page, GR) : "";
  });
}
DisplaySections();
export function paginations(parent) {
  const plac = document.querySelector(`.${parent} .countainer-inner`);
  let api = parent === "rated" ? TMDB.Rated_Url : TMDB.POP_URL;
  const pages = document.querySelectorAll(
    `.${parent} .pagination-holder .pagi-item`,
  );
  let mainPage = document.querySelector(
    `.${parent} .pagination-holder .pagi-item.main`,
  );
  pages.forEach((a) => {
    a.addEventListener("click", () => {
      if (a.classList.contains("next")) {
        page++;
      } else if (a.classList.contains("prev")) {
        page > 1 ? page-- : 1;
      } else {
        page = parseInt(a.innerHTML, 1);
      }
      if (!a.classList.contains("next") && !a.classList.contains("prev") && !a.classList.contains("main")) {
        page = a.innerHTML;
        fetchMedia(api, plac, page);
      }      
      fetchMedia(api, plac, page);
      mainPage.innerHTML = page;
    });
  });
}
// Initialize paginations for different containers
const Containers = ["rated", "Popular"];
Containers.forEach((c) => {
  paginations(c);
});

