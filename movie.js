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
        let overviewHeader = document.createElement('h2')
        let overview = document.createElement('div')
        let creditsHeader = document.createElement('h2')
        let credits = document.createElement('div')

        title.innerText = `${results.title}`
        voteAverage.innerText = `Vote Average: ${results.vote_average}`
        released.innerText = `Released: ${results.release_date}`
        overviewHeader.innerText = "Overview"
        overview.innerText = results.overview
        creditsHeader.innerText = "Cast"

        // get credits
        movieCredits(movieId)
        .then(result => {
            console.log(result)
            let creditStr = ""
            for (castObj of result.cast) {
                creditStr += `${castObj.name}, `;
            }
            credits.innerText = creditStr
        })

        let movieInfo = document.getElementById("movie-info");
        movieInfo.appendChild(title)
        movieInfo.appendChild(voteAverage)
        movieInfo.appendChild(released)
        movieInfo.appendChild(overviewHeader)
        movieInfo.appendChild(overview)
        movieInfo.appendChild(creditsHeader)
        movieInfo.appendChild(credits)
    })
    .catch(error => console.log(error));

// Make the call to get the info based on the id
movieImages(movieId)
    .then(result => {
        console.log(result);
        // makeImageCarousel(result.posters); // Leaving this here as a hint for making a scrolling gallery
    })
    .catch(error => console.log(error));
