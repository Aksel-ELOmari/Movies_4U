const api_key = '03760268c2411e2d785ed677c960080d';
const base_Url = 'https://api.themoviedb.org/3/';
const POP_URL = 'movie/popular?language=en-US';
const Rated_Url = "movie/top_rated?language=en-US";
const Disc_URL = 'discover/movie?language=en-US';
const Latest_URL = 'movie/latest?language=en-US';
const img_url = 'https://image.tmdb.org/t/p/original/';
let page = 1;


function getMovies(api,plac,PG,GR)
{
    const Genre_api = `https://api.themoviedb.org/3/${api}&page=${PG}&api_key=03760268c2411e2d785ed677c960080d&with_genres=${GR}`;
        fetch(Genre_api)
        .then(response => response.json())
        .then(res => 
            {if(res.results.length > 0){
                    plac.innerHTML = '';
                    const Movies = res.results;
                    Movies.forEach(Movie => {
                        // console.log(Movie);
                        let {id,title,poster_path,backdrop_path,release_date,vote_average} = Movie;
                        let MovieCard = document.createElement('a');
                        MovieCard.href = `./preview.html?id=${id}&page=${PG}&URL=${api}&GR=${GR}&Type=Movie`;
                        MovieCard.classList.add('CarouselCard');
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

let Ratedholder = document.querySelector('#rated .countainer-inner');
getMovies(Rated_Url,Ratedholder,page);

let Popholder = document.querySelector('#Popular .countainer-inner');
getMovies(POP_URL,Popholder,page);


let popRight_btn = document.querySelector('#PopRight_btn');
let popLeft_btn = document.querySelector('#PopLeft_btn');
let popCurr = document.getElementById('Popmain-page');
popCurr.innerHTML = page;
popRight_btn.addEventListener('click',()=>{
    page++;
    popCurr.innerHTML = page;
    getMovies(POP_URL,Popholder,page);
});
popLeft_btn.addEventListener('click',()=>{
    page--;
    popCurr.innerHTML = page;
    getMovies(POP_URL,Popholder,page);
});

let ratedRight_btn = document.querySelector('#ratedRight_btn');
let ratedLeft_btn = document.querySelector('#ratedLeftt_btn');
let ratCurr = document.getElementById('ratedmain-page');
ratCurr.innerHTML = page;
ratedRight_btn.addEventListener('click',()=>{
    page++;
    ratCurr.innerHTML = page;
   getMovies(Rated_Url,Ratedholder,page);
});
ratedLeft_btn.addEventListener('click',()=>{
    page--;
    ratCurr.innerHTML = page;
   getMovies(Rated_Url,Ratedholder,page);
});



(function SF()
{
    let sienceFinctionholder = document.querySelector('#sienceFinction .CarouselSlider .CarouselSlider-inner');
    getMovies(Disc_URL,sienceFinctionholder,page,878);
})();

(function action()
{
    let actionholder = document.querySelector('#action .CarouselSlider .countainer-inner');
    getMovies(Disc_URL,actionholder,page,28);
})();

(function ACTION(){
    let Actionholder = document.querySelector('#action .CarouselSlider-inner');
     getMovies(Disc_URL,Actionholder,page,28);    
})();

(function ADVE(){
    let Adventureholder = document.querySelector('#adventure .CarouselSlider-inner');
     getMovies(Disc_URL,Adventureholder,page,12);    
})();

(function ANIME(){
    let Animationholder = document.querySelector('#animation .CarouselSlider-inner');
     getMovies(Disc_URL,Animationholder,page,16);    
})();

(function COMEDY(){
    let Comedyholder = document.querySelector('#comedy .CarouselSlider-inner');
     getMovies(Disc_URL,Comedyholder,page,35);    
})();

(function CRIME(){
    let Crimeholder = document.querySelector('#crime .CarouselSlider-inner');
     getMovies(Disc_URL,Crimeholder,page,80);    
})();

(function DOC(){
    let Documentholder = document.querySelector('#documentary .CarouselSlider-inner');
     getMovies(Disc_URL,Documentholder,page,99);    
})();

(function DRM(){
    let Dramaholder = document.querySelector('#drama .CarouselSlider-inner');
     getMovies(Disc_URL,Dramaholder,page,18);    
})();

(function   FM(){
    let Familyholder = document.querySelector('#family .CarouselSlider-inner');
     getMovies(Disc_URL,Familyholder,page,10751);    
})();

(function FNZ(){
    let Fantasyholder = document.querySelector('#fantasy .CarouselSlider-inner');
     getMovies(Disc_URL,Fantasyholder,page,14);    
})();

(function   HST(){
    let Historyholder = document.querySelector('#history .CarouselSlider-inner');
     getMovies(Disc_URL,Historyholder,page,36);    
})();

(function   HOROR(){
    let Horrorholder = document.querySelector('#horror .CarouselSlider-inner');
     getMovies(Disc_URL,Horrorholder,page,27);    
})();

(function Music(){
    let Musicholder = document.querySelector('#music .CarouselSlider-inner');
     getMovies(Disc_URL,Musicholder,page,10402);    
})();

(function Mystory(){
    let Mysteryholder = document.querySelector('#mystery .CarouselSlider-inner');
     getMovies(Disc_URL,Mysteryholder,page,9648);    
})();

(function ROMANCE(){
    let Romanceholder = document.querySelector('#romance .CarouselSlider-inner');
     getMovies(Disc_URL,Romanceholder,page,10749);    
})();
(function Thriller(){
    let thrillerholder = document.querySelector('#thriller .CarouselSlider-inner');
     getMovies(Disc_URL,thrillerholder,page,53);    
})();
(function War(){
    let warholder = document.querySelector('#war .CarouselSlider-inner');
     getMovies(Disc_URL,warholder,page,10752);    
})();
(function Western(){
    let westernholder = document.querySelector('#western .CarouselSlider-inner');
     getMovies(Disc_URL,westernholder,page,37);    
})();

