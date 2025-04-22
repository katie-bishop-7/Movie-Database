// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const personId = queryObj.id;

const searchInput = document.getElementById("search-text");
const idInput = document.getElementById("url-text");
const findButton = document.getElementById("find-button")
const navButton = document.getElementById("nav-button");
const drawer = document.getElementById("drawer")
const closeIcon = document.getElementById("close-icon")

let drawerIsOpen = false;


// Nav drawer open and close
navButton.addEventListener("click", e => {
    drawerIsOpen = !drawerIsOpen;
    drawer.dataset.open = `${drawerIsOpen}`
});

// Remove search input on close icon click
closeIcon.addEventListener("click", (e) => {
    searchInput.value = ""
})

// Navigate with a query string
function searchEventListeners(element) {
    element.addEventListener("click", e => {
        e.preventDefault();
        window.location.href = `${element.href}?query=${searchInput.value}`;
    })
}
searchEventListeners(findButton)


// Make the call to get the info based on the id
personDetails(personId)
    .then(results => {
        // Insert image
        console.log(results)
        const img = document.getElementById("movie-poster")
        img.src = `${imgUrl}w500${results.profile_path}`
        img.alt = `${results.name} profile picture`

        // Insert name, birthday, deathday if applicable, biography, runtime, vote average
        let name = document.createElement('h1')
        let birthday = document.createElement('div')
        let birthplace = document.createElement('div')
        let biographyHeader = document.createElement('h2')
        let biography = document.createElement('div')
        let creditsHeader = document.createElement('h2')

        name.innerText = `${results.name}`
        birthday.innerText = `Born: ${results.birthday}`
        birthplace.innerText = `Place of birth: ${results.place_of_birth}`
        biographyHeader.innerText = "Biography"
        biography.innerText = results.biography
        creditsHeader.innerText = "Known For"

        const movieInfo = document.getElementById("movie-info");
        movieInfo.appendChild(name)
        movieInfo.appendChild(birthday)


        if (results.deathday) {
            let deathday = document.createElement('div')
            deathday.innerText = `Died: ${results.deathday}`
            movieInfo.appendChild(deathday)
        }

        movieInfo.appendChild(birthplace)
        movieInfo.appendChild(biographyHeader)
        movieInfo.appendChild(biography)
        // get credits

        movieCreditsByPerson(personId)
            .then(result => {
                for (movieObj of result.cast) {
                    movieDetails(movieObj.id)
                        .then(res => {
                            const imgURL = `${imgUrl}w500${res.poster_path}`
                            const title = res.title

                            const card = document.createElement('div')
                            const img = document.createElement('img')
                            const titleDiv = document.createElement('div')
                            const characterDiv = document.createElement('div')
                            characterDiv.id = `character-name-${movieObj.id}`

                            img.src = imgURL;
                            titleDiv.innerText = title;
                            card.className = "info-card movie-cast-card clickable"

                            card.appendChild(img)
                            card.appendChild(titleDiv)
                            card.appendChild(characterDiv)

                            card.addEventListener("click", () => {
                                window.location.href = `movie.html?id=${res.id}`
                            })

                            document.getElementById("movie-credits").appendChild(card)
                        })

                }
            })

        tvCreditsByPerson(personId)
            .then(result => {
                console.log(result)
                for (tvObj of result.cast) {
                    tvDetails(tvObj.id)
                        .then(res => {
                            const imgURL = `${imgUrl}w500${res.poster_path}`
                            const title = res.name

                            const card = document.createElement('div')
                            const img = document.createElement('img')
                            const titleDiv = document.createElement('div')
                            const characterDiv = document.createElement('div')
                            characterDiv.id = `character-name-${res.id}`

                            img.src = imgURL;
                            titleDiv.innerText = title;
                            card.className = "info-card movie-cast-card clickable"

                            card.appendChild(img)
                            card.appendChild(titleDiv)
                            card.appendChild(characterDiv)

                            card.addEventListener("click", () => {
                                window.location.href = `series.html?id=${res.id}`
                            })

                            document.getElementById("tv-credits").appendChild(card)
                        })

                }
            })

    })
    .catch(error => console.log(error));

const carousel = document.getElementById("carousel-slider")
function makeImageCarousel(arrayOfPosters) {
    for (let i = 0; i < 3; i++) {
        for (posterObj of arrayOfPosters) {
            let poster = document.createElement("img")
            poster.src = `${imgUrl}w500${posterObj.file_path}`;
            poster.className = "carousel-picture"
            carousel.appendChild(poster)
        }
    }
}
// Make the call to get the info based on the id
personImages(personId)
    .then(result => {
        console.log(result);
        makeImageCarousel(result.profiles);
    })
    .catch(error => console.log(error));