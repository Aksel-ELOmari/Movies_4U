// ! Getting the URL Params
const Movie_data = window.location.search;
const Url_params = new URLSearchParams(Movie_data);
const base_Url = 'https://api.themoviedb.org/3/';
const POP_URL = 'movie/popular?language=en-US';
const Movie_id = Url_params.get('id');
const Movie_name = Url_params.get('name');
let page = Url_params.get('page') ? Url_params.get('page') : '1';
const this_url = Url_params.get('URL');
const GR = Url_params.get('GR');
const TYPE = Url_params.get('Type');

GR ? console.log(`the Genre is True: ${GR}`) : console.log('the Genre is False');
console.log(`ID :${Movie_id}`);
console.log(`Serie name is :${Movie_name}`);
console.log(`Page :${page}`);
console.log(`Api_url :${this_url}`);
console.log(`the type of the content is :${TYPE}`);

const api_key = '03760268c2411e2d785ed677c960080d';
const img_url = 'https://image.tmdb.org/t/p/original/';
const similar_url = `movie/${Movie_id}/similar?language=en-US`;

//=> Regular Posters Covers
const RegularPoster = "https://images.unsplash.com/photo-1620145648299-f926ac0a9470?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const RegularCover = "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
//<= Regular Posters Covers

const Genre_api = `https://api.themoviedb.org/3/${this_url}&page=${page}&api_key=03760268c2411e2d785ed677c960080d&with_genres=${GR}`;
const unGenre_api = `https://api.themoviedb.org/3/${this_url}&page=${page}&api_key=03760268c2411e2d785ed677c960080d`;

GR ? PCard(Genre_api) : PCard(unGenre_api);

function PCard(api) {
    fetch(api)
        .then(response => response.json())
        .then(res => {
            let Movies = res.results;
            Movies.forEach(Movie => {
                if (Movie_id == Movie.id) {
                    let { genre_ids, title, name, backdrop_path, release_date, vote_average, original_title, original_name, overview, poster_path } = Movie;
                    FetchTags(genre_ids);
                    document.querySelector('#headerCover').src = `${backdrop_path ? img_url + backdrop_path : RegularCover}`;
                    let MovieAlfa = document.createElement('div');
                    MovieAlfa.classList.add('MoviesData');
                    MovieAlfa.setAttribute('data-id', Movie.id);
                    MovieAlfa.innerHTML =
                        `
                        <h2 id="MoviePreviewName">${title ? title : name}</h2>
                        <h5 id="serieOriginalName">${name == original_name ? '' : original_name}</h5>
                        <div class="MoviesDethails">
                            <div class="MoviesRates">
                                <span id="MoviesP-Type">${TYPE}</span>
                                <span id="MoviesP-lng"></span>
                                <span id="MoviesP-Date">${release_date ? release_date : ''}</span>
                                <span id="MoviesP-Rate"><i class="fa-solid fa-star"></i>${vote_average.toFixed(1)}</span>
                                <span id="MoviesP-Popularity" style="color: orange;text-decoration:none;"><i class="fa-solid fa-chart-line"></i> </span>
                                <span id="MoviesP-Comp">Netifix</span>
                            </div>
                            <div class="MoviePreviewTags"></div>
                            <div class="MoviesPreviewStory">
                                <p id="MP-Preview">${overview}</p>
                            </div>
                            <div class="MoviePreviewButtons">
                                <button type="button" class="button" id="Watch" onclick="openNav()">Watch Now</button>
                            </div>
                        </div>
                    `;
                    document.querySelector('.MoviesContainer').append(MovieAlfa);

                    let MovieCover = document.createElement('div');
                    MovieCover.classList.add('MoviePreviewPoster');
                    MovieCover.innerHTML =
                        `
                            <img title="Movies Cover"  src="${poster_path ? img_url + poster_path : RegularPoster}" alt="">
                        `;
                    document.querySelector('.MoviesContainer').append(MovieCover);
                    document.getElementById('Trailer').addEventListener('click', () => {
                        openNav();
                    })
                }
            });
        })
}

function FetchTags(genres) {
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}`)
        .then(response => response.json())
        .then(res => {
            let Genres = res.genres;
            Genres.forEach(G => {
                genres.forEach(g => {
                    if (G.id === g) {
                        let a = document.createElement('a');
                        a.style.margin = '4px';
                        a.classList.add('tag-item');
                        a.innerHTML = `${G.name}`;
                        document.querySelector('.MoviePreviewTags').append(a);
                        document.querySelectorAll('#SerieSeasons .Saeson-Genre').forEach(SG => SG.innerHTML = `${G.name}`);
                    }
                })
            })
        })

}

let PlaceMoviePreview = document.querySelector('.MoviesContainer');
let bellowsimilar = document.querySelector('#relatedContent .CarouselSlider-inner');

function similar(place) {
    fetch(`${base_Url}tv/${Movie_id}/similar?language=en-US&page=${page}&api_key=${api_key}`)
        .then(response => response.json())
        .then(res => {
            place.innerHTML = '';
            let results = res.results;
            results.forEach(Movie => {
                let MovieCard = document.createElement('a');
                MovieCard.href = `./SeriesPreview.html?id=${Movie.id}&title=${Movie.title}&URL=tv/${Movie_id}/similar?language=en-US&page=${page}&Type=Movie`;
                MovieCard.classList.add('CarouselCard');
                MovieCard.setAttribute('id', `${Movie.id}`);
                MovieCard.setAttribute('data-id', `${Movie.id}`);
                MovieCard.innerHTML =
                    `
                        <img src="${Movie.poster_path ? img_url + Movie.poster_path : RegularPoster}" alt="${Movie.name} 's Poster" class="MoviePoster">
                        <img src="${Movie.backdrop_path ? img_url + Movie.backdrop_path : RegularCover}" alt="${Movie.name} 's Cover" class="MovieCover">
                        <h4 class="MovieTitle">${Movie.name}</h4>
                        <div class="MovieNum">
                            <span class="Movie-Type"></span>
                            <span class="Movie-Genre"></span>
                            <span class="Movie-Date">${Movie.first_air_date ? Movie.first_air_date.slice(0, 4) : '0'}</span>
                            <span class="Movie-Comp"></span>
                            <span class="Movie-Rate"><i class="fa-solid fa-star"></i>${Movie.vote_average.toFixed(1)}</span>
                            <span class="Movie-DurEpCount"></span>
                        </div>
                    `
                place.append(MovieCard);
            });
        })
}
similar(bellowsimilar);

// Start function to get the Serie 's Seasons
const Seasons = document.querySelector('#SerieSeasons .CarouselSlider-inner');
GetSeasons(Seasons);
function GetSeasons(place) {
    fetch(`https://api.themoviedb.org/3/tv/${Movie_id}?language=en-US&api_key=${api_key}`)
        .then(response => response.json())
        .then(res => {
            place.innerHTML = '';
            let series = res.seasons;
            series.forEach(S => {
                let { poster_path, backdrop_path, season_number, vote_average, name, episode_count, air_date, id } = S;
                let SeasonCard = document.createElement('a');
                SeasonCard.target = `_blanket`;
                SeasonCard.classList.add('CarouselCard');
                SeasonCard.setAttribute('id', `${id}`);
                SeasonCard.setAttribute('data-id', id);
                SeasonCard.innerHTML =
                    `
                    <img src="${poster_path ? img_url + poster_path : RegularPoster}" alt="${name}'s Poster" class="MoviePoster">
                    <img src="${backdrop_path ? img_url + backdrop_path : img_url + poster_path}" alt="${name} 's Cover" class="MovieCover">
                    <h4 class="MovieTitle">${season_number ? season_number : '0'}</h4>
                    <div class="MovieNum">
                        <span class="Movie-Type">${name ? name : 'Movies_4U'}</span>
                        <span class="Movie-Genre Saeson-Genre"></span>
                        <span class="Movie-Date">${air_date ? air_date : '0'}</span>
                        <span class="Movie-Comp"></span>
                        <span class="Movie-Rate"><i class="fa-solid fa-star"></i>${vote_average ? vote_average.toFixed(1) : '0'}</span>
                        <span class="Movie-Dur EpCount">${episode_count ? episode_count : '0'} Ep</span>
                    </div>
                `
                place.append(SeasonCard);
            });
        })
}
// End function to get the Serie 's Seasons

let MorerelatedContent = document.querySelector('.MorerelatedContent .CarouselSlider-inner');
let btnPGPrev = document.querySelector('.btn-pg-Prev');
let btnPGCurr = document.getElementById('main-page');
let btnPGNext = document.querySelector('.btn-pg-Next');
btnPGCurr.innerHTML = page;

PageTogller(btnPGNext, btnPGCurr, btnPGPrev, similar, bellowsimilar);
function PageTogller(R, C, L, F, Pram) {
    C.innerHTML = page;
    R.onclick = () => {
        page++;
        C.innerHTML = page;
        F(Pram);
    }
    L.onclick = () => {
        if (page == 0) return;
        page--;
        C.innerHTML = page;
        F(Pram);
    }
}

function fetchVideos() {
    fetch(`https://api.themoviedb.org/3/tv/${Movie_id}?api_key=${api_key}&append_to_response=videos`)
        .then(response => response.json())
        .then(res => {
            let Videos = res.videos.results;
            let OverlyCarousel = document.querySelector('.Videos-inner');
            if (!=Videos) {closeNav();}
            else {
                Videos.forEach(Video => {
                    let { name, key, site } = Video;
                    let Video_item = document.createElement('div');
                    Video_item.classList.add('Video-item');
                    if (site == "YouTube") {
                        Video_item.innerHTML =
                            `
                            <h3 class="video-title">${name}</h3>
                            <iframe width="779" height="438" src="https://www.youtube.com/embed/${key}"
                                title="${name}" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        `;
                    }
                    OverlyCarousel.append(Video_item);
                })
            }
        })
}
fetchVideos();

// function that handles the overlay
document.getElementById("overfly").style.display = "none";
/* Open */
function openNav() {
    document.getElementById("overfly").style.display = "block";
}
/* Close */
function closeNav() {
    document.getElementById("overfly").style.display = "none";
}
