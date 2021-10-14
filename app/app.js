// Get DOM Elements
const btns = document.querySelectorAll('#generate');
const mainContainer = document.querySelector('.main-container');
const openingDisplay = document.querySelector('.opening-section');
const infoDisplay = document.querySelector('.display-section');
const displaySection = document.querySelector('.display-section');
const inputs = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');
const weatherWrapper = document.querySelector('.weather-info-wrapper');
const forcastSection = document.querySelector('.forcast');
const notFound = document.querySelector('.not-found');


const weatherIcons = {
    Clouds: '/Images/cloud.svg',
    Clear: '/Images/clear.svg',
    Rain: '/Images/rain.svg',
    Snow: '/Images/snow.svg',
    Thunderstorm: '/Images/thunderstorm.svg',
    Tornado: '/Images/tornado.svg',
    Haze: '/Images/haze.svg',
    Drizzle: '/Images/drizzle.svg',
    Fog: '/Images/fog.svg',
    Mist: '/Images/haze.svg',
    noIcon: '/Images/no-icon.svg'
}


const weekDays = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'];


// Store next five date weather data
let nextDay1 = [];
let nextDay2 = [];
let nextDay3 = [];
let nextDay4 = [];
let nextDay5 = [];


// Store API URl & Key
const forcastURl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'your api key';
let searchQuery;

// The Date
const today = new Date();
const week = today.toLocaleDateString('en-US',{weekday: 'long'});
const month = today.toLocaleDateString('en-US',{month: 'long'});
const day = today.getDate();
const year = today.getFullYear();
const date = `${week}, ${month} ${day}`;


// ------------------------------------


// Get weather data from API
async function getWeatherData(url){
    const response = await fetch(url);
    checkStatus(response);
    const data = await response.json();
    return data;
}


// Get forcast data from API
async function getForcastData(url){
    const response = await fetch(url);
    checkStatus(response);
    const data = await response.json();
    return data;
}


// Check response status for both fetch APIs and show not-found graphic
function checkStatus(response){
    if(response.status === 200){
        forcastSection.classList.remove('hide');
        weatherWrapper.classList.remove('hide');
        notFound.classList.remove('show');
        return Promise.resolve(response)
    } else{
        forcastSection.classList.add('hide');
        weatherWrapper.classList.add('hide');
        notFound.classList.add('show');
        setTimeout(() => {
            Promise.reject(new Error(alert(`Zip code ${response.statusText}. Try again!`)));
        }, 500);
    }
}


// Post data to End Point
async function postWeatherData(url, dataObj={}){
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    })

    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log('Something went wrong!', error);
    }
}

// Get data from End Point and update UI
async function updateUI() {
    const response = await fetch('/allData');

    try{
        const data = await response.json();
        const icon = data.icon;
        const temperature = Math.round((`${data.temp}` - 273.15) * 9/5 + 32);
        const maxTemp = Math.round((`${data.tempMax}` - 273.15) * 9/5 + 32);
        const minTemp = Math.round((`${data.tempMin}` - 273.15) * 9/5 + 32);
        let html = '';

        html = `
            <div class="city">
                <h2>${data.date}</h2>
                <h1>${data.city}</h1>
                <h3>${data.weather}</h3>
            </div>

            <div class="weather">
                <img src="${weatherIcons[icon] || weatherIcons[noIcon]}" alt="${icon} icon">
                <h1>${temperature}<span>&#176</span>F</h1>
                <span class="feeling">I'm feeling ${data.mood}</span>
            </div>

            <div class="weather-info">
                <div class="temps">
                    <h3>H ${maxTemp}<span>&#176</span>F</h3>
                    <h3>L ${minTemp}<span>&#176</span>F</h3>
                </div>
                <span class="wind">Wind ${data.wind} mph</span>
            </div>
        `;

        weatherWrapper.innerHTML = html;
    }catch(error){
        console.log(error);
    }
}


// Get forcast data and push to corresponding array
function getNextFiveDays(list, currentDay){
    
    for(let i = 0; i < list.length; i++) {
        let timestamp = list[i].dt * 1000;
        const forcastDates = new Date(timestamp).getDate();

        if(currentDay + 1 === forcastDates){
            nextDay1.push(new Date (today.setDate(currentDay + 1)));
            nextDay1.push(list[i].main.temp_max);
            nextDay1.push(list[i].weather[0].main);
        } else if(currentDay + 2 === forcastDates){
            nextDay2.push(new Date (today.setDate(currentDay + 2)));
            nextDay2.push(list[i].main.temp);
            nextDay2.push(list[i].weather[0].main);
        } else if(currentDay + 3 === forcastDates){
            nextDay3.push(new Date (today.setDate(currentDay + 3)));
            nextDay3.push(list[i].main.temp);
            nextDay3.push(list[i].weather[0].main);
        } else if(currentDay + 4 === forcastDates){
            nextDay4.push(new Date (today.setDate(currentDay + 4)));
            nextDay4.push(list[i].main.temp);
            nextDay4.push(list[i].weather[0].main);
        } else if(currentDay + 5 === forcastDates){
            nextDay5.push(new Date (today.setDate(currentDay + 5)));
            nextDay5.push(list[i].main.temp);
            nextDay5.push(list[i].weather[0].main);
        }
    }
    console.log(nextDay5);
}



// Update Forcast Section
function updateForcastUI(data){
    const days = document.querySelectorAll('.day');
    const forcastIcons = document.querySelectorAll('.forcast img');
    const forcastTemp = document.querySelectorAll('.temperature');
    const forcastList = data.list;
    const d = new Date();
    const currentDay = d.getDate();
    getNextFiveDays(forcastList, currentDay);
    const nextDaysArray = [nextDay1, nextDay2, nextDay3, nextDay4, nextDay5];

    days.forEach((el, index) => {
        const futureDay = nextDaysArray[index][0].getDay();
        el.innerHTML = weekDays[futureDay];
    });

    forcastIcons.forEach((el, index) => {
        const weatherCondition = nextDaysArray[index][2];
        el.setAttribute('src', `${weatherIcons[weatherCondition]}`);
    });

    forcastTemp.forEach((el, index) => {
        const tempToFar = nextDaysArray[index][1];
        const temperature = Math.round((`${tempToFar}` - 273.15) * 9/5 + 32);
        el.innerHTML = `${temperature}<span>&#176</span>F`;
    });

    // Reset arrays
    nextDay1.length = 0;
    nextDay2.length = 0;
    nextDay3.length = 0;
    nextDay4.length = 0
    nextDay5.length = 0;
    console.log(nextDay1, nextDay2, nextDay3, nextDay4, nextDay5);
}

// Screens functionality-------------------

// Hides opening section
function hideOpeningSection(index){
    const vh = document.clientHeight || window.innerHeight;
    openingDisplay.style.bottom = vh + 'px';

    for(let i = 0; i < btns.length; i++){ 
        if(i === index){
            openingDisplay.style.visibility = "hidden";
            mainContainer.style.transform = "translateY(-" + openingDisplay.style.bottom + ")";
            displaySection.classList.add('show');
        }
    }
}


// Gets values from inputs
function getformValues(btnIndex, array) {
    for(let i = 0; i < array.length; i++){
        if(i === btnIndex && array[i].value != ''){
            let formValue = array[i].value;
            return formValue;
        }
    }
}

// Submit buttons event listeners
btns.forEach((btn, index) => {
    btn.addEventListener('click',() => {
        const inputValue = getformValues(index, inputs);
        const textareaValue = getformValues(index, textAreas);
        searchQuery = inputValue;
        
        if(!inputValue || !textareaValue){
            alert('Please fill entry, thank you!');
            return;
        }

        hideOpeningSection(index);
        handleWeatherData(textareaValue);
        handleForcastData(searchQuery);
        
    });
});

// Handles Post Request of main weather data
function handleWeatherData(text){
    getWeatherData(weatherURL+searchQuery+apiKey)
            .then((data) => {
                postWeatherData('/postEntry', {
                    date: date,
                    city: data.name,
                    weather: data.weather[0].main,
                    temp: data.main.temp,
                    mood: text,
                    icon: data.weather[0].main,
                    tempMax: data.main.temp_max,
                    tempMin: data.main.temp_min,
                    wind: data.wind.speed
                });
            })
            .then(updateUI)
            .catch((err) => console.log(err));
}


// Handles forcast Data
function handleForcastData(searchQuery){
    getForcastData(forcastURl+searchQuery+apiKey)
        .then(updateForcastUI)
        .catch((err) => console.log(err));
}




