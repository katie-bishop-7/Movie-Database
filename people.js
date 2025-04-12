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

// // Navigate with a query String
// findButton.addEventListener("click", e => {
//     e.preventDefault();
//     console.log(`${e.target.href}?id=${idInput.value}`);
//     window.location.href = `${e.target.href}?id=${idInput.value}`;
// });

const number_of_cards = 50;

peoplePopular()
    .then(results => {
        for (let i = 0; i < number_of_cards; i++) { // iterate over number of cards
            // create card with info
            console.log(results.results[i])
            let img = document.createElement('img')
            let card = document.createElement('div')
            let name = document.createElement('h3')

            img.src = `${imgUrl}w500${results.results[i].profile_path}`
            img.alt = `${results.results[i].name} profile picture`
            name.innerText = `${results.results[i].name}`

            card.appendChild(img);
            card.appendChild(name);
            card.className = "info-card clickable"
            card.id = `person-card-${i}`

            card.addEventListener("click", (e) => {
                e.preventDefault()
                window.location.href = `person.html?id=${results.results[i].id}`;

            })

            document.getElementById("person-card-container").appendChild(card)
        }
    })
    .catch(error => console.log(error));


// Make the call to get results from the search
peopleSearch(peopleName)
    .then(result => console.log(result))
    .catch(error => console.log(error));

