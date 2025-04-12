const searchInput = document.getElementById("search-text");
const movieButton = document.getElementById("movie-button");
const tvButton = document.getElementById("tv-button");
const personButton = document.getElementById("person-button");
const navButton = document.getElementById("nav-button");
const drawer = document.getElementById("drawer")
let drawerIsOpen = false;


// Nav drawer open and close
navButton.addEventListener("click", e => {
    drawerIsOpen = !drawerIsOpen;
    drawer.dataset.open = `${drawerIsOpen}`
});

// Navigate with a query string
function searchEventListeners(element) {
    element.addEventListener("click", e => {
        console.log(searchInput.value);
        e.preventDefault();
        window.location.href = `${element.href}?query=${searchInput.value}`;
    })
}

// Add the listener to each anchor button
searchEventListeners(movieButton);
searchEventListeners(tvButton);
searchEventListeners(personButton);

const number_of_cards = 5;

moviePopular()
    .then(results => {
        for (let i = 0; i < number_of_cards; i++) { // iterate over number of cards
            // create card with info
            console.log(results.results[i])
            let img = document.createElement('img')
            let card = document.createElement('div')
            let title = document.createElement('h3')
            let voteAverage = document.createElement('div')

            img.src = `${imgUrl}w500${results.results[i].poster_path}`
            img.alt = `${results.results[i].title} poster`
            title.innerText = `${results.results[i].title} (${results.results[i].release_date.slice(0, 4)})`
            voteAverage.innerText = `Vote Average: ${results.results[i].vote_average}`

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(voteAverage);
            card.className = "info-card clickable"
            card.id = `movie-card-${i}`

            card.addEventListener("click", (e) => {
                e.preventDefault()
                window.location.href = `movie.html?id=${results.results[i].id}`;

            })

            document.getElementById("movie-card-container").appendChild(card)
        }
    })
    .catch(error => console.log(error));

tvPopular()
    .then(results => {
        for (let i = 0; i < number_of_cards; i++) { // iterate over number of cards
            // create card with info
            let img = document.createElement('img')
            let card = document.createElement('div')
            let title = document.createElement('h3')
            let voteAverage = document.createElement('div')

            img.src = `${imgUrl}w500${results.results[i].poster_path}`
            img.alt = `${results.results[i].title} poster`
            title.innerText = `${results.results[i].name} (${results.results[i].first_air_date.slice(0, 4)})`
            voteAverage.innerText = `Vote Average: ${results.results[i].vote_average}`

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(voteAverage);
            card.className = "info-card clickable"
            card.id = `tv-card-${i}`

            document.getElementById("tv-card-container").appendChild(card)
        }
    })
    .catch(error => console.log(error));

peoplePopular()
    .then(results => {
        for (let i = 0; i < number_of_cards; i++) { // iterate over number of cards
            // create card with info
            let img = document.createElement('img')
            let card = document.createElement('div')
            let title = document.createElement('h3')

            img.src = `${imgUrl}w500${results.results[i].profile_path}`
            img.alt = `${results.results[i].name} picture`
            title.innerText = results.results[i].name

            card.appendChild(img);
            card.appendChild(title);
            card.className = "info-card clickable"
            card.id = `people-card-${i}`

            card.addEventListener("click", () => {
                window.location.href = `person.html?id=${results.results[i].id}`
            })

            document.getElementById("people-card-container").appendChild(card)
        }
    })
    .catch(error => console.log(error));