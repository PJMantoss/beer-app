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
            optionsIBU = "";
    }
})