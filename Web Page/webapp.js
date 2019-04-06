const express = require('express');
// const axios = require('axios');
const hbs = require('hbs');
const utils = require('./utils.js');
const bodyParser = require('body-parser');

var app = express();

// Partials
hbs.registerPartials(__dirname + '/partials');

app.set('views', __dirname);
app.set('view engine', 'hbs');

// Web Pages
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.listen(8080, () => {
    console.log('Server is up and running');
    utils.init()
});

app.post('/login', (request, response) => {
    var db = utils.getDb();
    db.collection('users').find({}).toArray((err, result) => {
        if (err) {
            response.send('Unable to get login right now');
        }
        for (i=0; i < result.length; i++) {
            if (request.body.username === result[i].username) {
                if (request.body.password === result[i].password) {
                    console.log('hey');
                    response.render('index.hbs', {
                        success_login: 'You are logged in!'
                    })
                } else {
                    response.render('index.hbs', {
                        success_login: 'Invalid login info'
                    })
                }
            } else {
                response.render('index.hbs', {
                    success_login: 'Invalid login info'
                })
            }
        }
    });
});

app.post('/register', function (req, res) {
    var db = utils.getDb();
    db.collection('users').insertOne(req.body);
    res.render('index.hbs', {
        success_register: 'Thank You for Registering!'
    })
});
