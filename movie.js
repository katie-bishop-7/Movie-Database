// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");
const slider = document.getElementById("carousel-slider");

// Show the images based on the id
findButton.addEventListener("click", e => {
    document.getElementById("image-div").innerHTML =
        `<img src=${imgUrl}w300/${idInput.value}></img>`
});

// Make the call to get the info based on the id
movieDetails(movieId)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Make the call to get the info based on the id
movieImages(movieId)
    .then(result => {
        console.log(result);
        // makeImageCarousel(result.posters); // Leaving this here as a hint for making a scrolling gallery
    })
    .catch(error => console.log(error));
