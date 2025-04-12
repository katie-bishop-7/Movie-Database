// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");
const slider = document.getElementById("carousel-slider");
const navButton = document.getElementById("nav-button");
const drawer = document.getElementById("drawer")
let drawerIsOpen = false;


// Nav drawer open and close
navButton.addEventListener("click", e => {
    drawerIsOpen = !drawerIsOpen;
    drawer.dataset.open = `${drawerIsOpen}`
});
// // Show the images based on the id
// findButton.addEventListener("click", e => {
//     document.getElementById("image-div").innerHTML =
//         `<img src=${imgUrl}w300/${idInput.value}></img>`
// });

// Make the call to get the info based on the id
movieDetails(movieId)
    .then(results => {
        // Insert image
        console.log(results)
        const poster = document.getElementById("movie-poster")
        poster.src = `${imgUrl}w500${results.poster_path}`
        poster.alt = `${results.title} poster`

        // Insert title, release date, rating, overview, runtime, vote average
        let title = document.createElement('h1')
        let voteAverage = document.createElement('div')
        let released = document.createElement('div')
        let runtime = document.createElement('div')
        let overviewHeader = document.createElement('h2')
        let overview = document.createElement('div')
        let creditsHeader = document.createElement('h2')

        title.innerText = `${results.title}`
        voteAverage.innerText = `Vote Average: ${results.vote_average}`
        released.innerText = `Released: ${results.release_date}`
        runtime.innerText = `Runtime: ${results.runtime} minutes`
        overviewHeader.innerText = "Overview"
        overview.innerText = results.overview
        creditsHeader.innerText = "Cast"

        const movieInfo = document.getElementById("movie-info");
        movieInfo.appendChild(title)
        movieInfo.appendChild(voteAverage)
        movieInfo.appendChild(released)
        movieInfo.appendChild(runtime)
        movieInfo.appendChild(overviewHeader)
        movieInfo.appendChild(overview)

        // get credits
        
        movieCredits(movieId)
        .then(result => {
            for (castObj of result.cast) {
                const card = document.createElement('div')
                const img = document.createElement('img')
                const nameDiv = document.createElement('div')
                const characterDiv = document.createElement('div')
                characterDiv.innerText = castObj.character
                characterDiv.className = "character"

                card.appendChild(img)
                card.appendChild(nameDiv)
                card.appendChild(characterDiv) 

                personDetails(castObj.id)
                .then(res => {
                    img.src = `${imgUrl}w500${res.profile_path}`;
                    nameDiv.innerText = res.name;
                    card.className = "info-card movie-cast-card"
                    
                    card.addEventListener("click", () => {
                        window.location.href = `person.html?id=${res.id}`
                    })
                    
                    document.getElementById("movie-credits").appendChild(card)
                })
                
            }
        })
        
    })
    .catch(error => console.log(error));

// Make the call to get the info based on the id
movieImages(movieId)
    .then(result => {
        console.log(result);
        // makeImageCarousel(result.posters); // Leaving this here as a hint for making a scrolling gallery
    })
    .catch(error => console.log(error));
