// Getting the URL Params
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");
const media = params.get("media");
const m = media == "movie" ? "movie" : "tv";
// ! Local Imports
import { TMDB, fetchMedia } from "./fetcher.js";
import { toggleElement } from "./index.js";

// !~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const overfly = document.getElementById("overfly");
overfly ? document.body.classList.add("no-scrollbar") : "";

const Watch_trailer_btn = document.getElementById("Watch_trailer_btn");
toggleElement(Watch_trailer_btn);
function get_main_movie(id) {
  fetch(
    `https://api.themoviedb.org/3/${m}/${id}?&api_key=03760268c2411e2d785ed677c960080d`,
  )
    .then((response) => response.json())
    .then((Movie) => {
      // console.log(Movie);
      builthMovie(Movie);
    });
}
get_main_movie(id);
// biulthing the moveis
function builthMovie(Movie) {
  let {
    backdrop_path,
    belongs_to_collection,
    budget,
    genres,
    homepage,
    id,
    imdb_id,
    origin_country,
    original_language,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    first_air_date,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
    title,
    original_title,
    name,
    original_name,
    video,
    vote_average,
    vote_count,
  } = Movie;
  document.querySelector("#headerCover").src =
    `${backdrop_path ? TMDB.img_url + backdrop_path : TMDB.DCover}`;
  let MovieAlfa = document.createElement("div");
  MovieAlfa.classList.add("MoviesData");
  MovieAlfa.innerHTML = `
        <h2 id="MoviePreviewName">${title ? title : name}</h2>
        <h4 id="MovieOriginalTitle">${title !== original_title ? original_title : ""}</h4>
        <div class="MoviesDetails">
            <div class="MoviesRates">
                <span id="MoviesP-Type">${release_date ? "Movie" : "Tv Serie"}</span>
                <span id="MoviesP-Date">${release_date ? release_date : first_air_date.split("-").join("/")}</span>
                <span id="MoviesP-Rate"><i class="fa-solid fa-star"></i>${vote_average.toFixed(1)}(${Movie.vote_count})</span>
                <span class="Movie-Popularity" style="color:orange"><i class="fa-solid fa-chart-line"></i> ${Movie.popularity}</span>
                <span id="MoviesP-Comp">${origin_country || ""}</span>
            </div>
            <div class="MoviesPreviewStory">
                <p id="MP-Preview">${overview}</p>
            </div>
            <div class="MoviePreviewButtons d-flex gap-8">
                <button title="watch trailer" class="watch-btn button" id="Watch_trailer_btn" data-target="overfly">Watch Trailer</button>
                <a ${homepage ? `href="${homepage}"` : `class="d-none"`}><button type="button" class="button homepage-btn">Watch Now</button></a>
            </div>
        </div>
        `;
  document.querySelector(".MoviesContainer").append(MovieAlfa);
  let MovieCover = document.createElement("div");
  MovieCover.classList.add("MoviePreviewPoster");
  MovieCover.innerHTML = `
        <img loading="lazy" title="Movies Cover" src="${poster_path ? TMDB.img_url + poster_path : TMDB.DPoster}" alt="">
        `;
  document.querySelector(".MoviesContainer").append(MovieCover);
}

// getting the similar content
function similar() {
  const bellowsimilar = document.querySelector(
    "#relatedContent .CarouselSlider-inner",
  );
  if (!bellowsimilar) {
    console.error("Carousel container not found");
    return;
  }
  let currentPage = 1;
  const api = `${m}/${id}/similar?language=en-US&page=${currentPage}&api_key=${TMDB.api_key}`;
  fetchMedia(api, bellowsimilar, 1);

  const btns = document.querySelectorAll(".CarouselSlider-btns button");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (btn.classList.contains("next")) {
        currentPage++;
      } else if (btn.classList.contains("prev")) {
        currentPage--;
      }
      console.log(`Fetching page: ${currentPage}`);
      fetchMedia(api, bellowsimilar, currentPage);
    });
  });
}
// Initialize the similar function
similar();

function fetchVideos() {
  const api = `https://api.themoviedb.org/3/${m}/${id}?api_key=03760268c2411e2d785ed677c960080d&append_to_response=videos`;
  fetch(api)
    .then((response) => response.json())
    .then((res) => {
      let Videos = res.videos.results;
      // console.log(Videos);
      let OverlyCarousel = document.querySelector(".Videos-inner");
      if (!Videos) {
        document.querySelector(".watch-btn").classList.add("d-none");
      } else if(overfly) {
        Videos.forEach((Video) => {
          let { name, key, site } = Video;
          let Video_item = document.createElement("div");
          Video_item.classList.add("Video-item");
          if (site == "YouTube") {
            Video_item.innerHTML = `
                    <h3 class="video-title">${name}</h3>
                    <iframe width="779" height="438" src="https://www.youtube.com/embed/${key}"
                        title="${name}" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    `;
          } else if (site == "Yahoo") {
            console.log(`this link is from another site than YouTube!`);
          }
          OverlyCarousel.append(Video_item);
        });
      }
    });
}
overfly?fetchVideos():'';
