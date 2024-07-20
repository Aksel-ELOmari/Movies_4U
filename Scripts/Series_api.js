const base_url = 'https://api.themoviedb.org/3/';
const api_key = '03760268c2411e2d785ed677c960080d';
const img_url = 'https://image.tmdb.org/t/p/original/';

const POP_URL = 'tv/popular?language=en-US';
const Disc_URL = 'discover/tv?language=en-US';
const Rated_URL = 'tv/top_rated?language=en-US';
const Latest_URL = 'tv/latest?language=en-US';

let page = 1;

// Function to fetch series data
// ! Carousel Functionalty
function CarouselCards(Caro, PG, site) {
    fetch(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${PG}&api_key=${api_key}`)
        .then(response => response.json())
        .then(res => {
            let results = res.results;
            document.querySelector(`${Caro} .list`).innerHTML = '';
            document.querySelector(`${Caro} .thumbnail`).innerHTML = '';
            results.forEach(Movie => {
                let list_item = document.createElement('div');
                list_item.classList.add('item');
                list_item.innerHTML = `
                    <img title="img" src="${img_url}${Movie.backdrop_path ? Movie.backdrop_path : 'default.jpg'}">
                `;
                document.querySelector(`${Caro} .list`).append(list_item);
                // Carousel Part 2
                let list_thumbnail = document.createElement('div');
                list_thumbnail.classList.add('item');
                list_thumbnail.innerHTML = `
                       <a href="${site}id=${Movie.id}&name=${Movie.name}&page=${PG}&URL=discover/tv?language=en-US" target="_blank"><img title="img" src="${img_url}${Movie.poster_path}" data-id="${Movie.id}"></a>
                        <div class="content">
                            <div class="title">
                                ${Movie.title ? Movie.title : Movie.name}
                            </div>
                        </div>
                `;
                document.querySelector(`${Caro} .thumbnail`).append(list_thumbnail);
            });
        });
}
// ! Carousel Functionality
CarouselCards('#SeriesCarousel', page, `./SeriesPreview.html?`);

function getSeries(api, plac, PG, GR = '') {
    const Genre_api = `${base_url}${api}&page=${PG}&api_key=${api_key}&with_genres=${GR}`;
    fetch(Genre_api)
        .then(response => response.json())
        .then(res => {
            if (res.results.length > 0) {
                plac.innerHTML = '';
                const Series = res.results;
                Series.forEach(Serie => {
                    let { id, name, backdrop_path, poster_path, first_air_date, vote_average } = Serie;
                    let SerieCard = document.createElement('a');
                    SerieCard.href = `./SeriesPreview.html?id=${id}&page=${PG}&URL=${api}&GR=${GR}&Type=Serie`;
                    SerieCard.classList.add('CarouselCard');
                    SerieCard.setAttribute('data-id', `${id}`);
                    SerieCard.innerHTML = `
                            <img src="${poster_path ? img_url + poster_path : 'default.jpg'}" alt="${name} 's Poster" class="MoviePoster">
                            <img src="${backdrop_path ? img_url + backdrop_path : 'default.jpg'}" alt="${name} 's Cover" class="MovieCover">
                            <h4 class="MovieTitle">${name}</h4>
                            <div class="MovieNum">
                            <span class="Movie-Type">Movie</span>
                                <span class="Movie-Genre">Action</span>
                                <span class="Movie-Date">${first_air_date.slice(0, 4)}</span>
                                <span class="Movie-Comp">HBO</span>
                                <span class="Movie-Rate"><i class="fa-solid fa-star"></i>${vote_average.toFixed(1)}</span>
                                <span class="Movie-Dur">190min</span>
                            </div>
                        `;
                    plac.append(SerieCard);
                });
            } else {
                console.log(`the results array is empty!`);
                plac.parentElement.style.display = 'none';
            }
        });
}

function CreasePage(R, C, L, api, plac) {
    R.onclick = () => {
        page++;
        C.innerHTML = page;
        getSeries(api, plac, page);
    }

    L.onclick = () => {
        if (page === 1) return;
        page--;
        C.innerHTML = page;
        getSeries(api, plac, page);
    }
}

(function Rated() {
    let R = document.querySelector('#rated .showMore-btn .btn-pg-Next');
    let C = document.querySelector('#rated .showMore-btn .btn-pg-Curr');
    C.innerHTML = page;
    let L = document.querySelector('#rated .showMore-btn .btn-pg-Prev');
    let Ratedholder = document.querySelector('#rated .container-inner');
    CreasePage(R, C, L, Disc_URL, Ratedholder, page);
    getSeries("tv/top_rated?language=en-US", Ratedholder, page);
})();

(function Popular() {
    let R = document.querySelector('#Popular .showMore-btn .btn-pg-Next');
    let C = document.querySelector('#Popular .showMore-btn .btn-pg-Curr');
    C.innerHTML = page;
    let L = document.querySelector('#Popular .showMore-btn .btn-pg-Prev');
    let Popularholder = document.querySelector('#Popular .container-inner');
    CreasePage(R, C, L, Disc_URL, Popularholder, page);
    getSeries('tv/popular?language=en-US', Popularholder, page);
})();

(function SF() {
    let sienceFictionholder = document.querySelector('#sienceFinction .CarouselSlider .CarouselSlider-inner');
    getSeries(Disc_URL, sienceFictionholder, page);
})();

(function action() {
    let actionholder = document.querySelector('#action .CarouselSlider .container-inner');
    getSeries(Disc_URL, actionholder, page, 28);
})();

(function ACTION() {
    let Actionholder = document.querySelector('#action .CarouselSlider-inner');
    getSeries(Disc_URL, Actionholder, page, 28);
})();

(function ADVE() {
    let Adventureholder = document.querySelector('#adventure .CarouselSlider-inner');
    getSeries(Disc_URL, Adventureholder, page, 12);
})();

(function ANIME() {
    let Animationholder = document.querySelector('#animation .CarouselSlider-inner');
    getSeries(Disc_URL, Animationholder, page, 16);
})();

(function COMEDY() {
    let Comedyholder = document.querySelector('#comedy .CarouselSlider-inner');
    getSeries(Disc_URL, Comedyholder, page, 35);
})();

(function CRIME() {
    let Crimeholder = document.querySelector('#crime .CarouselSlider-inner');
    getSeries(Disc_URL, Crimeholder, page, 80);
})();

(function DOC() {
    let Documentholder = document.querySelector('#documentary .CarouselSlider-inner');
    getSeries(Disc_URL, Documentholder, page, 99);
})();

(function DRM() {
    let Dramaholder = document.querySelector('#drama .CarouselSlider-inner');
    getSeries(Disc_URL, Dramaholder, page, 18);
})();

(function FM() {
    let Familyholder = document.querySelector('#family .CarouselSlider-inner');
    getSeries(Disc_URL, Familyholder, page, 10751);
})();

(function FNZ() {
    let Fantasyholder = document.querySelector('#fantasy .CarouselSlider-inner');
    getSeries(Disc_URL, Fantasyholder, page, 14);
})();

(function HST() {
    let Historyholder = document.querySelector('#history .CarouselSlider-inner');
    getSeries(Disc_URL, Historyholder, page, 36);
})();

(function HOROR() {
    let Horrorholder = document.querySelector('#horror .CarouselSlider-inner');
    getSeries(Disc_URL, Horrorholder, page, 27);
})();

(function Music() {
    let Musicholder = document.querySelector('#music .CarouselSlider-inner');
    getSeries(Disc_URL, Musicholder, page, 10402);
})();

(function Mystory() {
    let Mysteryholder = document.querySelector('#mystery .CarouselSlider-inner');
    getSeries(Disc_URL, Mysteryholder, page, 9648);
})();

(function ROMANCE() {
    let Romanceholder = document.querySelector('#romance .CarouselSlider-inner');
    getSeries(Disc_URL, Romanceholder, page, 10749);
})();

(function Thriller() {
    let thrillerholder = document.querySelector('#thriller .CarouselSlider-inner');
    getSeries(Disc_URL, thrillerholder, page, 53);
})();

(function War() {
    let warholder = document.querySelector('#war .CarouselSlider-inner');
    getSeries(Disc_URL, warholder, page, 10752);
})();

(function Western() {
    let westernholder = document.querySelector('#western .CarouselSlider-inner');
    getSeries(Disc_URL, westernholder, page, 37);
})();
