import { addEventsToBtns } from '../client/js/app'


// Css Imports
import './styles/styles.css';
import './styles/mobile-styles.css';
import './styles/media-queries.css';

// Set Image
import umbreallaImg from '../assets/Images/umbrella.svg'

const mobileImg = document.querySelector('.logo img');
mobileImg.src = umbreallaImg;

const displayFormUmbrella = document.querySelector('#display-sec-umbrella');
displayFormUmbrella.src = umbreallaImg;

// Calling functions
addEventsToBtns();