const api_key = '03760268c2411e2d785ed677c960080d';
const base_Url = 'https://api.themoviedb.org/3/';
const POP_URL = 'movie/popular?language=en-US';
const Disc_URL = 'discover/movie?language=en-US';
const Latest_URL = 'movie/latest?language=en-US';
const img_url = 'https://image.tmdb.org/t/p/original/';

function FetchAnimes(PG){
        fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=${PG}&api_key=03760268c2411e2d785ed677c960080d&with_genres=16`)
        .then(response => response.json())
        .then(res => {
            console.log(res);
            document.querySelector('.rated--inner').innerHTML = '';
            const Movies = res.results;
                    Movies.forEach(Movie => {
                        // console.log(Movie);
                        let {id,title,poster_path,backdrop_path,release_date,vote_average} = Movie;
                        let MovieCard = document.createElement('a');
                        MovieCard.href = `../preview.html?id=${id}&page=${PG}&URL=discover/movie?language=en-US&GR=16&Type=Anime`;
                        MovieCard.classList.add('CarouselCard');
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
                        document.querySelector('.rated--inner').append(MovieCard);
                });
        });

    }
document.addEventListener('DOMContentLoaded',()=>
{
    let sfha = localStorage.getItem('sfha');
    FetchAnimes(sfha);

    localStorage.setItem('sfha','1');
    let anime__pageCrease = document.getElementById('anime__pageCrease');
    let anime__pageCurr = document.getElementById('main-page');
    let anime__pageDecrease = document.getElementById('anime__pageDecrease');
    anime__pageCurr.innerHTML = sfha;
    anime__pageCrease.onclick = () =>{
       sfha++;
       anime__pageCurr.innerHTML = sfha;
        FetchAnimes(sfha);
       localStorage.setItem('sfha',sfha);
    console.log(localStorage.getItem('sfha'));

    }
    anime__pageDecrease.onclick = () =>{
        sfha--;
        anime__pageCurr.innerHTML = sfha;
        FetchAnimes(sfha);
        localStorage.setItem('sfha',sfha);
    console.log(localStorage.getItem('sfha'));

    }
})

let Allpaginations = document.querySelectorAll('.btn-pg-Curr');
Allpaginations.forEach(pagi =>
    {
        pagi.addEventListener('click',()=>{
            let sfha = pagi.innerHTML;
            FetchAnimes(sfha);
            localStorage.setItem('sfha',sfha);
        })
    })