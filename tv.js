// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const tvName = queryObj.query;

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
// findButton.addEventListener("click", e => {
//     e.preventDefault();
//     console.log(`${e.target.href}?id=${idInput.value}`);
//     window.location.href = `${e.target.href}?id=${idInput.value}`;
// });

const number_of_cards = 50;

tvPopular()
    .then(results => {
        console.log(results, "results")
        for (let i = 0; i < number_of_cards; i++) { // iterate over number of cards
            // create card with info
            let img = document.createElement('img')
            let card = document.createElement('div')
            let title = document.createElement('h3')
            let voteAverage = document.createElement('div')

            img.src = `${imgUrl}w500${results.results[i].poster_path}`
            img.alt = `${results.results[i].name} poster`
            title.innerText = `${results.results[i].name} (${results.results[i].first_air_date.slice(0,4)})`
            voteAverage.innerText = `Vote Average: ${results.results[i].vote_average}`

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(voteAverage);
            card.className = "info-card"
            card.id = `tv-card-${i}`

            card.addEventListener("click", (e) => {
                e.preventDefault()
                window.location.href = `series.html?id=${results.results[i].id}`;

            })

            document.getElementById("tv-card-container").appendChild(card)
        }
    })
    .catch(error => console.log(error));



// Make the call to get results from the search
tvSearch(tvName)
    .then(result => console.log(result))
    .catch(error => console.log(error));