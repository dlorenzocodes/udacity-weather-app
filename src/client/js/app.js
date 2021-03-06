// imports
import { HideOpeningSection } from './hideOpeningSection'
import { postZipcode } from './postZipcode'



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



let searchQuery;

// The Date
const today = new Date();
const week = today.toLocaleDateString('en-US',{weekday: 'long'});
const month = today.toLocaleDateString('en-US',{month: 'long'});
const day = today.getDate();
const year = today.getFullYear();
const date = `${week}, ${month} ${day}`;



const hideOpeningSection = new HideOpeningSection();


// ------------------------------------

// Gets values from inputs
function getformValues(btnIndex, array) {
    for(let i = 0; i < array.length; i++){
        if(i === btnIndex && array[i].value != ''){
            let formValue = array[i].value;
            return formValue;
        }
    }
}

function addEventsToBtns() {
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
            postZipcode({zipcode: searchQuery});
            console.log(searchQuery);
            inputs[1].value = '';
            textAreas[1].value = '';
        });
    });
}

export { addEventsToBtns };







// // Check response status for both fetch APIs and show not-found graphic
// function checkStatus(response){
//     if(response.status === 200){
//         forcastSection.classList.remove('hide');
//         weatherWrapper.classList.remove('hide');
//         notFound.classList.remove('show');
//         return Promise.resolve(response)
//     } else{
//         forcastSection.classList.add('hide');
//         weatherWrapper.classList.add('hide');
//         notFound.classList.add('show');
//         setTimeout(() => {
//             Promise.reject(new Error(alert(`Zip code ${response.statusText}. Try again!`)));
//         }, 500);
//     }
// }



// // Get data from End Point and update UI
// async function updateUI() {
//     const response = await fetch('/allData');

//     try{
//         const data = await response.json();
//         const icon = data.icon;
//         let html = '';

//         html = `
//             <div class="city">
//                 <h2>${data.date}</h2>
//                 <h1>${data.city}</h1>
//                 <h3>${data.weather}</h3>
//             </div>

//             <div class="weather">
//                 <img src="${weatherIcons[icon] || weatherIcons[noIcon]}" alt="${icon} icon">
//                 <h1>${Math.round(data.temp)}<span>&#176</span>F</h1>
//                 <span class="feeling">I'm feeling ${data.mood}</span>
//             </div>

//             <div class="weather-info">
//                 <div class="temps">
//                     <h3>H ${Math.round(data.tempMax)}<span>&#176</span>F</h3>
//                     <h3>L ${Math.round(data.tempMin)}<span>&#176</span>F</h3>
//                 </div>
//                 <span class="wind">Wind ${data.wind} mph</span>
//             </div>
//         `;

//         weatherWrapper.innerHTML = html;
//     }catch(error){
//         console.log(error);
//     }
// }


// // Get forcast data and push to corresponding array
// function getNextFiveDays(list, currentDay){
    
//     for(let i = 0; i < list.length; i++) {
//         let timestamp = list[i].dt * 1000;
//         const forcastDates = new Date(timestamp).getDate();

//         if(currentDay + 1 === forcastDates){
//             nextDay1.push(new Date (today.setDate(currentDay + 1)));
//             nextDay1.push(list[i].main.temp_max);
//             nextDay1.push(list[i].weather[0].main);
//         } else if(currentDay + 2 === forcastDates){
//             nextDay2.push(new Date (today.setDate(currentDay + 2)));
//             nextDay2.push(list[i].main.temp);
//             nextDay2.push(list[i].weather[0].main);
//         } else if(currentDay + 3 === forcastDates){
//             nextDay3.push(new Date (today.setDate(currentDay + 3)));
//             nextDay3.push(list[i].main.temp);
//             nextDay3.push(list[i].weather[0].main);
//         } else if(currentDay + 4 === forcastDates){
//             nextDay4.push(new Date (today.setDate(currentDay + 4)));
//             nextDay4.push(list[i].main.temp);
//             nextDay4.push(list[i].weather[0].main);
//         } else if(currentDay + 5 === forcastDates){
//             nextDay5.push(new Date (today.setDate(currentDay + 5)));
//             nextDay5.push(list[i].main.temp);
//             nextDay5.push(list[i].weather[0].main);
//         }
//     }
// }



// // Update Forcast Section
// function updateForcastUI(data){
//     const days = document.querySelectorAll('.day');
//     const forcastIcons = document.querySelectorAll('.forcast img');
//     const forcastTemp = document.querySelectorAll('.temperature');
//     const forcastList = data.list;
//     const d = new Date();
//     const currentDay = d.getDate();
//     getNextFiveDays(forcastList, currentDay);
//     const nextDaysArray = [nextDay1, nextDay2, nextDay3, nextDay4, nextDay5];

//     days.forEach((el, index) => {
//         const futureDay = nextDaysArray[index][0].getDay();
//         el.innerHTML = weekDays[futureDay];
//     });

//     forcastIcons.forEach((el, index) => {
//         const weatherCondition = nextDaysArray[index][2];
//         el.setAttribute('src', `${weatherIcons[weatherCondition]}`);
//     });

//     forcastTemp.forEach((el, index) => {
//         const tempToFar = nextDaysArray[index][1];
//         const temperature = Math.round(tempToFar);
//         el.innerHTML = `${temperature}<span>&#176</span>F`;
//     });

//     // Reset arrays
//     nextDay1.length = 0;
//     nextDay2.length = 0;
//     nextDay3.length = 0;
//     nextDay4.length = 0
//     nextDay5.length = 0;
// }






