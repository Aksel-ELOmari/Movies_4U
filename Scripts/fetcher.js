export const TMDB = {
  api_key: "03760268c2411e2d785ed677c960080d",
  base_Url: "https://api.themoviedb.org/3/",
  POP_URL: "movie/popular?language=en-US",
  Rated_Url: "movie/top_rated?language=en-US",
  Disc_URL: "discover/movie?language=en-US",
  New_URL: "movie/latest?language=en-US",
  img_url: "https://image.tmdb.org/t/p/original/",
  DCover: "./SRC/image/D_cover.jpg",
  DPoster: "./SRC/image/D_poster.avif",
  page: 1,
  genre: 28,
  media: "movie",
};
var page = TMDB.page;
// const pathEx = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&api_key=03760268c2411e2d785ed677c960080d&with_genres=35`;
export let movies_array = [];
export function fetchMedia(api, plac, page, GR) {
  if(!plac)return; plac.innerHTML = '';
  const baseUrl = `https://api.themoviedb.org/3/${api || TMDB.Disc_URL}`;
  const params = `&page=${page || 1}&api_key=03760268c2411e2d785ed677c960080d`;
  const genreParam = GR ? `&with_genres=${GR}` : "";
  const path = `${baseUrl}${params}${genreParam}`;
  fetch(path)
    .then((response) => response.json())
    .then((res) => {
      const Media = res.results;
      if (Media.length > 0 && plac) {
        Media.forEach((Movie) => {
          const {
            id,
            title,
            poster_path,
            backdrop_path,
            release_date,
            vote_average,
            adult,
            first_air_date,
            genre_ids,
            name,
            origin_country,
            original_language,
            original_name,
            overview,
            popularity,
            vote_count,
          } = Movie;
          if (!movies_array.includes(id)) {
            movies_array.push(id);
            const MovieCard = document.createElement("a");
            MovieCard.href = `./preview.html?id=${id}&media=${release_date ? "movie" : "tv"}`;
            MovieCard.classList.add("CarouselCard");
            MovieCard.setAttribute("data-id", id);
            MovieCard.setAttribute("title", title ? title : name);
            MovieCard.innerHTML = `
              <img loading="lazy" src="${poster_path ? "https://image.tmdb.org/t/p/original/" + poster_path : TMDB.DPoster}" alt="${title || name}'s Poster" class="MoviePoster">
              <img loading="lazy" src="${backdrop_path ? "https://image.tmdb.org/t/p/original/" + backdrop_path : TMDB.DCover}" alt="${title || name}'s Cover" class="MovieCover">
              <h4 class="MovieTitle">${title || name}</h4>
              <div class="MovieNum">
                <span class="Movie-Type ${genre_ids.includes(10749) ? "" : "d-none"}" style="color:red">+18</span>
                <span class="Movie-Type">${origin_country || ""}</span>
                <span class="Movie-Type">${original_language || ""}</span>
                <span class="Movie-Type"><i class="fa-solid fa-chart-line"></i> ${popularity} </span>
                <span class="Movie-Date">${release_date || first_air_date}</span>
                <span class="Movie-Rate"><i class="fa-solid fa-star"></i>${vote_average.toFixed(1)}</span>
              </div>
            `;

            plac.appendChild(MovieCard);
          }
        });
        // .slice(0, 4)
      } else {
        console.log("there was an error");
        const parent = document.querySelector(`[data-id="${GR}"]`);
        parent.classList.add('d-none');
      }
    })
    .catch((error) => console.error(error));
}
// display the search results at the top
export const SearchResults = document.getElementById("searchResults");
export function SearchFunction(key, media = "movie", page, GR) {
  const baseUrl = `https://api.themoviedb.org/3/search/${media}?query=${key}`;
  const params = `&page=${page || 1}&api_key=03760268c2411e2d785ed677c960080d`;
  const genreParam = GR ? `&with_genres=${GR}` : "";
  const path = `${baseUrl}${params}${genreParam}`;
  fetch(path)
    .then((response) => response.json())
    .then((res) => {
      let results = res.results;
      results ? SearchResults.classList.remove("d-none") : "";
      SearchResults.innerHTML = "";
      results.forEach((Movie) => {
        let {
          id,
          title,
          poster_path,
          backdrop_path,
          release_date,
          vote_average,
          adult,
          first_air_date,
          genre_ids,
          name,
          origin_country,
          original_language,
          original_name,
          overview,
          popularity,
          vote_count,
        } = Movie;
        console.log(id);
        let MovieCard = document.createElement("a");
        MovieCard.href = `./preview.html?id=${id}&media=${release_date ? "movie" : "tv"}`;
        MovieCard.classList.add("CarouselCard", "SearchMovieCard");
        MovieCard.id = id;
        MovieCard.innerHTML = `
                <img loading="lazy" src="${poster_path ? TMDB.img_url + poster_path : TMDB.DPoster}" height="300px" width="150px" alt="${title ? title : name} 's Poster" class="MoviePoster">
                <h4 class="MovieTitle">${title ? title : name}</h4>
                <div class="MovieNum">
                    <span class="Movie-Type">${media ? media : "Movie"}</span>
                    <span class="Movie-Type ${genre_ids.includes(10749) ? "" : "d-none"}" style="color:red">+18</span>
                    <span class="Movie-Date">${release_date ? release_date : first_air_date}</span>
                    <span class="Movie-Comp"></span>
                    <span class="Movie-Rate">${vote_average ? vote_average.toFixed(1) : "0"}
                    <i class="fa-solid fa-star"></i></span>
                    <span class="Movie-Dur">${popularity}</span>
                </div>
                    `;
        SearchResults.appendChild(MovieCard);
      });
    });
}
// ? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Page Functionality    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Variable Declarations
const Search__inner = document.querySelector(
  "#Search__Results .countainer-inner",
);
const searchInput = document.querySelector("form input");
const searchForm = document.querySelector("form");
const searchbtn = document.querySelector(".search-btn");
const show_more_btn = document.querySelector(".show-more-btn button");
// Fetch Initial Media
fetchMedia(TMDB.Disc_URL, Search__inner, page);
// Function to Handle Show More
function showMore(GR) {
  show_more_btn.addEventListener("click", () => {
    page++;
    fetchMedia(TMDB.Disc_URL, Search__inner, page, GR);
  });
}
// Function to Setup Search Functionality
function setupSearchFunctionality() {
  if (searchForm && searchInput && searchbtn) {
    searchInput.addEventListener("keyup", () => {
      const media = TMDB.media;
      const key = searchInput.value.trim();

      if (key.length === 0) {
        Search__inner.innerHTML = "";
        Search__inner.classList.add("d-none");
        return;
      }

      SearchFunction(key, media);
      console.log(key);
    });

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const key = searchInput.value.trim();
      const media = TMDB.media;
      if (key.length > 0) {
        SearchFunction(key, media);
      }
    });

    searchbtn.addEventListener("click", () => {
      const key = searchInput.value.trim();
      const media = TMDB.media;
      if (key.length > 0) {
        SearchFunction(key, media);
      }
    });
  }
}
// Function to Setup Select Listeners
function setupSelectListeners() {
  const genreSelect = document.getElementById("genre-select");
  const mediaSelect = document.getElementById("media-select");
  if (genreSelect && mediaSelect) {
    genreSelect.addEventListener("change", () => {
      const GR = genreSelect.value;
      TMDB.genre = GR;
      showMore(GR);
      fetchMedia(TMDB.Disc_URL, Search__inner, page, GR);
      console.log("Selected Genre:", GR);
    });
    mediaSelect.addEventListener("change", () => {
      const m = mediaSelect.value;
      const key = searchInput.value.trim();
      TMDB.media = m;
      console.log("Selected Media Type:", m, key);
      if (key.length > 0) {
        SearchFunction(key, m);
      } else {
        return;
      }
    });
  }
}
// Initialize Functionality
setupSearchFunctionality();
setupSelectListeners();
