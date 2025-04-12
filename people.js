// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const peopleName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");
const navButton = document.getElementById("nav-button");
const drawer = document.getElementById("drawer")
let drawerIsOpen = false;


// Nav drawer open and close
navButton.addEventListener("click", e => {
    drawerIsOpen = !drawerIsOpen;
    drawer.dataset.open = `${drawerIsOpen}`
});

// Navigate with a query String
findButton.addEventListener("click", e => {
    e.preventDefault();
    console.log(`${e.target.href}?id=${idInput.value}`);
    window.location.href = `${e.target.href}?id=${idInput.value}`;
});

// Make the call to get results from the search
peopleSearch(peopleName)
    .then(result => console.log(result))
    .catch(error => console.log(error));

