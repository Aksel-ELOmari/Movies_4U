import { TMDB, movies_array } from "../fetcher.js";
import { pageName } from "../index.js";
const d_cover = TMDB.DCover;
const d_poster = TMDB.DPoster;

function CarouselCards(carouselSelector, media, page = 1) {
  fetch(
    `https://api.themoviedb.org/3/trending/${media}/day?language=en-US&page=${page}&api_key=03760268c2411e2d785ed677c960080d`,
  )
    .then((response) => response.json())
    .then((res) => {
      const Media = res.results;
      const listContainer = document.querySelector(`${carouselSelector} .list`);
      const thumbnailContainer = document.querySelector(
        `${carouselSelector} .thumbnail`,
      );
      listContainer.innerHTML = "";
      thumbnailContainer.innerHTML = "";
      Media.forEach((movie) => {
        const { id, title, poster_path, backdrop_path, name } = movie;
        if (!movies_array.includes(id) && listContainer && thumbnailContainer) {
          movies_array.push(id);
          const backdropPath = backdrop_path ? backdrop_path : d_cover;
          const posterPath = poster_path ? poster_path : d_poster;
          const listItem = document.createElement("div");
          listItem.classList.add("item");
          listItem.innerHTML = `<img  loading="lazy"  title="img" src="https://image.tmdb.org/t/p/original/${backdropPath ? backdropPath : TMDB.DPoster}">`;
          listContainer.append(listItem);

          const thumbnailItem = document.createElement("div");
          thumbnailItem.classList.add("item");
          thumbnailItem.innerHTML = `
                        <a href="./preview.html?id=${id}&media=${media}" target="_blank" id="${id}">
                            <img loading="lazy"  title="img" src="https://image.tmdb.org/t/p/original/${posterPath ? posterPath : TMDB.DPoster}">
                        </a>
                        <div class="content">
                            <div class="title">${title ? title : name}</div>
                        </div>`;
          thumbnailContainer.append(thumbnailItem);
        }
      });
    });
  // .catch(error => console.log(error));
}

if (pageName == "index.html") {
  let media = "movie";
  let carouselSelector = "#HomeCarousel";
  CarouselCards(carouselSelector, media);
} else if (pageName == "Series.html") {
  let media = "tv";
  let carouselSelector = "#SeriesCarousel";
  CarouselCards(carouselSelector, media);
}
