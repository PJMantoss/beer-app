// Variables
const api = "https://api.punkapi.com/v2/beers?page=";
const filterABV = document.getElementById("filterABV");
const filterIBU = document.getElementById("filterIBU");
const pagetText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let optionsABV = "", optionsIBU = "", page = 1;

// Filters
filterABV.addEventListener("change", e => {
    const value = e.target.value;

    switch(value){
        case "all":
            optionsABV = "";
            break
        case "weak":
            optionsABV = "&abv_lt=4.6";
            break
        case "medium":
            optionsABV = "&abv_gt=4.5&abv_lt=7.6";
            break
        case "strong":
            optionsABV = "&abv_gt=7.5";
            break
    }

    page = 1;
    getBeers();
});

filterIBU.addEventListener("change", e => {
    const value = e.target.value;

    switch(value){
        case "all":
            optionsIBU = "";
            break
        case "weak":
            optionsIBU = "&ibu_lt=35";
            break
        case "medium":
            optionsIBU = "&ibu_gt=34&ibu_lt=75";
            break
        case "strong":
            optionsIBU = "&ibu_gt=74";
            break
    }

    page =1;
    getBeers();
});

async function getBeers(){
    const url = api + optionsABV + optionsIBU;

    // fetch
    const beerPromise = await fetch(url);
    const beers = await beerPromise.json();
    //console.log(beers[0]);
    // Pagination

    // Render Data
    const beerDiv = document.querySelector(".beers");

    let beerHtml = "";

    beers.forEach(beer => {
        beerHtml += `
            <div class="beer-wrapper card">
                <img class="beer__img" src=${beer.image_url}>
                <div class="beer">
                    <h3>${beer.name}</h3>
                    <span class="beer__img">
                        <span>ABV: ${beer.abv}</span>
                        <span>IBU: ${beer.ibu}</span>
                    </span>
                </div>
                <div class="beer__content">
                    <div class="beer__name"></div>
                    <div class="beer__tagline"></div>
                    <div class="beer__description"></div>
                    <div class="beer__food-pairing"></div>
                </div>
            </div>
        `;
    });

    beerDiv.innerHTML = beerHtml;
}
getBeers();