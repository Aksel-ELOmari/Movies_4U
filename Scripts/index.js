// Sample data for favourites (replace this with actual data fetching logic)
const favourites = [
    {
        id: 1,
        title: 'Favorite Movie 1',
        poster: 'https://path-to-poster1.jpg',
        description: 'Description for favorite movie 1'
    },
    {
        id: 2,
        title: 'Favorite Movie 2',
        poster: 'https://path-to-poster2.jpg',
        description: 'Description for favorite movie 2'
    }
    // Add more favorite items as needed
];

// Placeholder for saving elements
let placeholder = document.querySelector('#SavedElements');

// Function to create and append favorite cards
function displayFavouriteCards() {
    favourites.forEach(fav => {
        // Create a card element
        let card = document.createElement('div');
        card.classList.add('favCard');

        // Set the inner HTML for the card
        card.innerHTML = `
            <img src="${fav.poster}" alt="${fav.title} Poster">
            <h3>${fav.title}</h3>
            <p>${fav.description}</p>
        `;

        // Append the card to the placeholder
        placeholder.appendChild(card);
    });
}

// Call the function to display the favorite cards
displayFavouriteCards();
