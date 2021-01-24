
var country,ConfirmedCases,Recovered,Deaths,place;

//Dom elements
const confirmedElem = document.getElementById('confirmedCases');
const recoveredElem = document.getElementById('RecoveredCases');
const deathsElem = document.getElementById('Deaths');
const countryElem = document.getElementById('placeAffected');
const SearchBtn = document.getElementById('Search');
const CountrySearched = document.getElementById('searchByCountry');
const errorElem = document.getElementById('error-icon');

// get Country name
async function success(UserLocation){
    const lat = UserLocation.coords.latitude;
    const lon = UserLocation.coords.longitude;
    const CountryApi=await fetch(`http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lon}&username=niranjanextc`)
     .then(data => data.json())
     .then(response => {
        country = response.countryName;
     });
    getcovidData(country,true);
}

// Covid data
function getcovidData(CountryName,LocationEnabled){
    var CovidApi;
    if(LocationEnabled){
        CovidApi=fetch(`https://covid-19-data.p.rapidapi.com/country?name=${CountryName}`,
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "bf7ee1620bmsh11b672d8d2dceecp15f7d7jsn6d0b5efa7e8e",
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
            }
        })
    }
    else{
        CovidApi=fetch("https://covid-19-data.p.rapidapi.com/totals", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "bf7ee1620bmsh11b672d8d2dceecp15f7d7jsn6d0b5efa7e8e",
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
            }
        });
    }
    CovidApi
    .then(data => data.json())
    .then(response => {
       if(response.length != 0 ) {
        ConfirmedCases = response[0].confirmed;
        Deaths = response[0].deaths;
        Recovered = ConfirmedCases-Deaths;
        DisplayData(ConfirmedCases,Deaths,Recovered,CountryName);
       }
       else{
           inputFailure();
       }
    });
}

// Inject to Dom

function DisplayData(confirmedCases,Deaths,Recovered,country){
    confirmedElem.textContent=confirmedCases;
    recoveredElem.textContent=Recovered;
    deathsElem.textContent=Deaths;
    countryElem.textContent=country.toUpperCase();
    CountrySearched.style.border="2px solid #60CC8A"
    errorElem.style.display='none';
}

// if location is not unabled
function failure(error){
    //Get worldwide data
    getcovidData('WorldWide',false);
}

// incorrect input
function inputFailure(){
    CountrySearched.style.border="2px solid #AB483F";
    errorElem.style.display="inline";
}

// Get user's latitude and longitude
navigator.geolocation.getCurrentPosition(success,failure);

// Search by country
SearchBtn.addEventListener('click',()=>{
    if(CountrySearched.value != ""){
        getcovidData(CountrySearched.value,true);
    }
    else{
        //error occured
        inputFailure();       
    }
})