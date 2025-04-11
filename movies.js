// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");

// Navigate with a query String
findButton.addEventListener("click", e => {
    e.preventDefault();
    console.log(`${e.target.href}?id=${idInput.value}`);
    window.location.href = `${e.target.href}?id=${idInput.value}`;
});

// Make the call to get results from the search
movieSearch(movieName)
    .then(result => console.log(result))
    .catch(error => console.log(error));
