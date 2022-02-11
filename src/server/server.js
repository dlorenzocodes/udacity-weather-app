
// Load express
const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


// Middleware (body-parser is depricated)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cross-site premissions
const cors = require('cors');
app.use(cors());

// Serve static file
app.use(express.static('dist'));


// Routes end point
let projectData = {};

app.get('/' , (req, res) => {
    res.sendFile('dist/index.html');
})

app.post('/postEntry', async (req, res) => {

    const weatherUrl = process.env.WEATHER_URL;
    const forcastUrl = process.env.FORCAST_URL;
    const apiKey = process.env.API_KEY;
    const zipCode = req.body.zipcode;
    console.log(zipCode)

    try{
        const [weather, forcast] = await Promise.all([
            axios.get(`${weatherUrl}${zipCode}&appid=${apiKey}&units=imperial`),
            axios.get(`${forcastUrl}${zipCode}&appid=${apiKey}&units=imperial`)
        ])

        projectData = {
            weather: weather.data.weather,
            temperature: weather.data.main,
            forcast: forcast.data.list
        }

        console.log(projectData);
        res.send(projectData);
    }catch(err){
        console.log(err)
    }
})


app.get('/postEntry', (req, res) => {
    res.send(projectData);
    console.log('Getting post ...')
})


// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening to port ${port}...`)});
