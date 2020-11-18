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
    pageText.innerText = page;

    if(page  === 1){
        prevPage.disabled = true;
    } else {
        prevPage.disabled = false;
    }

    if(beers.length < 25){
        nextPage.disabled = true;
    } else {
        nextPage.disabled = false;
    }

    // Render Data
    const beersDiv = document.querySelector(".beers");

    let genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';

    let beerHtml = "";

    beers.forEach(beer => {
        beerHtml += `
            <div class="beer-wrapper card">
                <img class="beer__img" src=${beer.image_url ? beer.image_url : genericBottle}>
                <div class="beer">
                    <h3>${beer.name}</h3>
                    <span class="beer__img">
                        <span>ABV: ${beer.abv}%</span>
                        <span>IBU: ${beer.ibu}</span>
                    </span>
                </div>
                <div class="beer__content">
                    <div class="beer__name">${beer.name}</div>
                    <div class="beer__tagline">${beer.tagline}</div>
                    <div class="beer__description">${beer.description}</div>
                    <div class="beer__food-pairing">
                        Pair with: ${beer.food-PerformanceResourceTiming.join(", ")}
                    </div>
                </div>
            </div>
        `;
    });

    beersDiv.innerHTML = beerHtml;
}

//Pagination
prevPage.addEventListener("click", () => {
    page--;
    getBeers();
});

nextPage.addEventListener("click", () => {
    page++;
    getBeers();
});

//initial
getBeers();