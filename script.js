// Variables
const url = "https://api.punkapi.com/v2/beers?page=";
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
            optionsABV = ""
            break;
        case "weak":
            optionsABV = ""
            break;
        case "medium":
            optionsABV = ""
            break;
        case "strong":
            optionsABV = ""
            break
    }
})