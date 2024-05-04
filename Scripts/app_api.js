const RegularPoster = "https://images.unsplash.com/photo-1620145648299-f926ac0a9470?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const RegularCover = "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// let page = 1; 

function CarouselCards(carouselSelector, media, PG) {
    fetch(`https://api.themoviedb.org/3/trending/${media}/day?language=en-US&page=${PG}&api_key=03760268c2411e2d785ed677c960080d`)
        .then(response => response.json())
        .then(res => {
            const results = res.results;
            const listContainer = document.querySelector(`${carouselSelector} .list`);
            const thumbnailContainer = document.querySelector(`${carouselSelector} .thumbnail`);

            listContainer.innerHTML = '';
            thumbnailContainer.innerHTML = '';

            results.forEach(movie => {
                const backdropPath = movie.backdrop_path ? movie.backdrop_path : RegularCover;
                const posterPath = movie.poster_path ? movie.poster_path : RegularPoster;

                const listItem = document.createElement('div');
                listItem.classList.add('item');
                listItem.innerHTML = `<img title="img" src="https://image.tmdb.org/t/p/original/${backdropPath}">`;
                listContainer.append(listItem);

                const thumbnailItem = document.createElement('div');
                thumbnailItem.classList.add('item');
                thumbnailItem.innerHTML = `
                    <a href="./preview.html?id=${movie.id}&page=${PG}&URL=discover/${media}?language=en-US&Type=movie" target="_blank">
                        <img title="img" src="https://image.tmdb.org/t/p/original/${posterPath}">
                    </a>
                    <div class="content">
                        <div class="title">${movie.title ? movie.title : movie.name}</div>
                    </div>`;
                thumbnailContainer.append(thumbnailItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
function startCarouselInterval(carouselSelector, media) {
    setInterval(() => {
        page++;
        CarouselCards(carouselSelector, media, page);
    }, 120000);
}
// Initial call to CarouselCards
CarouselCards('#HomeCarousel', 'movie', page);
// Start automatic slide for Home Carousel
startCarouselInterval('#HomeCarousel', 'movie');
