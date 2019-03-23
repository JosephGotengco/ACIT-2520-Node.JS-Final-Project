const express = require('express');
// const axios = require('axios');
const hbs = require('hbs');

var app = express();

// Partials
hbs.registerPartials(__dirname + '/partials');

app.set('views', __dirname);
app.set('view engine', 'hbs');

// Web Pages
app.use(express.static(__dirname));


app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: "Home Page",
        header: "Welcome to Home!"
    });
});

app.get('/code', (request, response) => {
    response.render('code.hbs', {
        title: 'Code Page',
        header: "This is about me!"
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        title: 'Project Page',
        header: "This is about me!"
    });
});

app.listen(8080);
console.log("Webapp is now operational!")