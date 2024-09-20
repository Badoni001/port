const apiKey = 'your_api_key'; // Replace with your OMDb API key

document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value;
    if (query) {
        searchMovies(query);
    }
});

function searchMovies(query) {
    const url = `https://www.omdbapi.com/?s=${query}&apikey=42033674`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                document.getElementById('movieContainer').innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function displayMovies(movies) {
    const container = document.getElementById('movieContainer');
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const moviePoster = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'; // Placeholder if no poster
        movieElement.innerHTML = `
            <img src="${moviePoster}" alt="${movie.Title}">
            <div class="movie-details">
                <h2 class="movie-title">${movie.Title}</h2>
                <p class="movie-year">Year: ${movie.Year}</p>
            </div>
        `;

        container.appendChild(movieElement);
    });
}