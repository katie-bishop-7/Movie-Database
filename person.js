// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const personId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");

// Show the images based on the id
findButton.addEventListener("click", e => {
    document.getElementById("image-div").innerHTML =
        `<img src=${imgUrl}w185/${idInput.value}></img>`
});

// Make the call to get the info based on the id
personDetails(personId)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Make the call to get the info based on the id
personImages(personId)
    .then(result => console.log(result))
    .catch(error => console.log(error));