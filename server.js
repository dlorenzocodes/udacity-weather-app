
// Load express
const express = require('express');
const app = express();


// Middleware (body-parser is depricated)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cross-site premissions
const cors = require('cors');
app.use(cors());

// Serve static file
app.use(express.static('app'));


// Routes end point
let projectData = {};

app.get('/allData', (req, res) => {
    res.send(projectData);
    console.log('Getting data...');
});

app.post('/postEntry', (req, res) => {
    projectData = req.body;
    res.send(projectData);
    console.log('Post has been received...');
});



// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening to port ${port}...`)});
