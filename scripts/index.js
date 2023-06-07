"use strict";

console.log('loading...');

// Variables
const citiesDropdown = document.getElementById("citiesDropdown"); // Cities Dropdown
let selectedCity = citiesDropdown.value; // City Selected from Dropdown

const latitudeOutput = document.getElementById("latitudeOutput"); // Latitude Output
const longitudeOutput = document.getElementById("longitudeOutput"); // Longitude Output

const geoCard = document.getElementById("geoCard"); //Geographic Location Card
const table = document.getElementById("table"); // Table with weather information


/*____________________________________________________________________________________________*/


// Next...
window.onload = function() {

    addCitiesToDropdown();

    hideGeographicLocationCard();

    hideTableCard();

    citiesDropdown.onchange = showGeographicLocation;
}


/*____________________________________________________________________________________________*/


// Functions - adds cities to dropdown
function addCitiesToDropdown() {

    for (let city of cities) {
        let newCityOption = new Option(city.name);
        citiesDropdown.appendChild(newCityOption);
    }

    console.log(`Cities are in the Dropdown`);
}


// Function - shows the geographic location for the chosen city
function showGeographicLocation() {

    selectedCity = citiesDropdown.value; // Update the selected city

    if (selectedCity !== "") {
        const theSelectedCity = cities.find(city => city.name === selectedCity);

        const latitude = theSelectedCity.latitude;
        const longitude = theSelectedCity.longitude;

        console.log(latitude);  // Outputs: Latitude
        console.log(longitude); // Outputs: Longitude

        latitudeOutput.innerHTML = latitude;
        longitudeOutput.innerHTML = longitude;

        showGeographicLocationCard();
        showTableCard();
        weatherAPI();
    }
}


// Functions - hides and shows the geographic locations card

function hideGeographicLocationCard() {

    geoCard.style.display = "none";

}

function showGeographicLocationCard() {

    geoCard.style.display = "block";

}


// Functions - hides and shows the table card

function hideTableCard() {

    table.style.display = "none";

}

function showTableCard() {

    table.style.display = "block";

}

/*____________________________________________________________________________________________*/


// Function - This is going to look up the weather content for the city selected using the city,
// longitude, and latitude

function weatherAPI() {

    let stationLookupUrl = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;

    fetch(stationLookupUrl)
    .then(response => response.json())
    .then(data => {
        let weatherUrl = data.properties.forecast;
        getWeather(weatherUrl);
       }
    )
    }
