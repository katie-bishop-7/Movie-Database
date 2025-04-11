const searchInput = document.getElementById("search-text");
const movieButton = document.getElementById("movie-button");
const tvButton = document.getElementById("tv-button");
const personButton = document.getElementById("person-button");
const navButton = document.getElementById("nav-button");
const drawer = document.getElementById("drawer")
let drawerIsOpen = false;

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

moviePopular()
    .then(result => console.log(result))
    .catch(error => console.log(error));

peoplePopular()
    .then(result => console.log(result))
    .catch(error => console.log(error));

tvPopular()
    .then(result => console.log(result))
    .catch(error => console.log(error));