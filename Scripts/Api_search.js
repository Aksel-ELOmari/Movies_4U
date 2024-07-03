// ! Calling the variables 
const api_key = '03760268c2411e2d785ed677c960080d';
const base_Url = 'https://api.themoviedb.org/3/';
const POP_URL = 'movie/popular?language=en-US';
const Disc_URL = 'discover/tv?language=en-US';
const Latest_URL = 'movie/latest?language=en-US';
let plac = document.querySelector('#Search__Results .countainer-inner');
const img_url = 'https://image.tmdb.org/t/p/original/';
let page = 1;
// ! Calling the variables 
//=> Regular Posters Covers
const RegularPoster = "https://images.unsplash.com/photo-1620145648299-f926ac0a9470?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const RegularCover = "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
//<= Regular Posters Covers

let searchInput = document.querySelector('form input');
let searchForm = document.querySelector('form');
let searchbtn = document.getElementById('searchbtn');
let Genres = document.querySelectorAll('.UL__genres li a');

searchInput.addEventListener('keyup', () => {
    let key = searchInput.value;
    let media = mediaSelect.value;
    SearchFunction(key, media);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let key = searchInput.value;
    let media = mediaSelect.value;
    SearchFunction(key, media);
});

searchbtn.addEventListener('click', () => {
    let key = searchInput.value;
    let media = mediaSelect.value;
    SearchFunction(key, media);
});

Genres.forEach(el => {
    el.addEventListener('click', () => {
        Search__inner.style.display = 'none';
        GR = el.id;
        getMovies(page, GR);
    });
});

let mediaSelect = document.querySelector('#Select-box');
mediaSelect.addEventListener('change', () => {
    let key = searchInput.value;
    let media = mediaSelect.value;
    console.log(mediaSelect.value);
    SearchFunction(key, media);
    getMovies(page,media);
});
function SearchFunction(key, media = "movie", GR = '') {
    Search__inner.style.display = 'flex';
    Search__inner.innerHTML = '';
    fetch(`https://api.themoviedb.org/3/search/${media}?query=${key}&page=${page}&api_key=${api_key}&with_genres=${GR}`)
        .then(response => response.json())
        .then(res => {
            let results = res.results;
            results.forEach(Movie => {
                let { poster_path, title, id, release_date, vote_average, genre_ids, name, first_air_date, original_name } = Movie;
                console.log(id);
                let MovieCard = document.createElement('a');
                MovieCard.href = media == "movie" ? 
                `./preview.html?id=${id}&page=${page}&URL=search/${media}?&GR=${genre_ids[0]}&Type=${media}`:
                `./SeriesPreview.html?id=${id}&page=${page}&URL=search/${media}?&GR=${genre_ids[0]}&Type=${media}`;
                MovieCard.classList.add('CarouselCard', 'SearchMovieCard','favCard');
                MovieCard.setAttribute('data-id',id);
                MovieCard.id = id;
                MovieCard.innerHTML =
                    `
                <img src="${poster_path ? img_url + poster_path : RegularPoster}" height="300px" width="150px" alt="${title ? title : name} 's Poster" class="MoviePoster">
                <h4 class="MovieTitle">${title ? title : name}</h4>
                <div class="MovieNum">
                    <span class="Movie-Type">${media?media:'Movie'}</span>
                    <span class="Movie-Genre">Action</span>
                    <span class="Movie-Date">${release_date ? release_date : first_air_date}</span>
                    <span class="Movie-Comp">HBO</span>
                    <span class="Movie-Rate">${vote_average ? vote_average.toFixed(1) : '0'}
                    <i class="fa-solid fa-star"></i></span>
                    <span class="Movie-Dur">190min</span>
                    </div>
                    `;
                Search__inner.appendChild(MovieCard);
            });
    });
}


//--------------- Search  Function  --------------------------
var Search__inner = document.querySelector('#searchResults');
Genres.forEach(el => {
    el.addEventListener('click',()=>{
        console.log(el.id);
        GR = el.id ;
        getMovies(page,media,GR);
    })
})
getMovies(page,media='movie',GR='');
function getMovies(page,media,GR='')
{
    const Genre_api = `https://api.themoviedb.org/3/discover/${media}?language=en-US&page=${page}&api_key=03760268c2411e2d785ed677c960080d&with_genres=${GR}`;
        fetch(Genre_api)
        .then(response => response.json())
        .then(res => 
            {if(res.results.length > 0){
                    // plac.innerHTML = '';
                    const Movies = res.results;
                    Movies.forEach(Movie => {
                        // console.log(Movie);
                        let {id,title,poster_path,backdrop_path,release_date,vote_average} = Movie;
                        let MovieCard = document.createElement('a');
                        MovieCard.href = `./preview.html?id=${id}&page=${page}&URL=discover/${media}?language=en-US&GR=${GR}&Type=Movie`;
                        MovieCard.classList.add('CarouselCard','favCard');
                        MovieCard.setAttribute('data-id',id);
                        MovieCard.innerHTML = 
                        `
                            <img src="${img_url}${poster_path}" alt="${title} 's Poster" class="MoviePoster">
                            <img src="${img_url}${backdrop_path}?${img_url}${backdrop_path}:"./image/ContactCover.avif"" alt="${title} 's Cover" class="MovieCover">
                            <h4 class="MovieTitle">${title}</h4>
                            <div class="MovieNum">
                            <span class="Movie-Type">Movie</span>
                                <span class="Movie-Genre">Action</span>
                                <span class="Movie-Date">${release_date.slice(0,4)}</span>
                                <span class="Movie-Comp">HBO</span>
                                <span class="Movie-Rate"><i class="fa-solid fa-star"></i>${vote_average.toFixed(1)}</span>
                                <span class="Movie-Dur">190min</span>
                            </div>
                        `;
                        plac.append(MovieCard);
                    });
                }else{
                    console.log(`the results array is emty !`);
                    plac.parentElement.style.display = 'none';
                }
            })
};

setInterval(() => {
    page++;
    getMovies(page,media,GR='');
}, 120000);

let Searchmore__btn = document.querySelector('.viewMore__btn');
let thisGenre = document.querySelector('.this-genre');
Searchmore__btn.onclick = function(){
    page++;
    genre_id = thisGenre.id;
    getMovies(page,media,genre_id);
}

