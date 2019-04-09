const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const utils = require('./utils.js');
var session = require('express-session');

var app = express();

// Cookie Code
// Ignore this line underneath I just copied it from a website LOL
app.use(session({secret: 'XASDASDA'}));
var ssn;
// Cookie Code


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Partialsclear
hbs.registerPartials(__dirname + '/partials');

app.set('views', __dirname);
app.set('view engine', 'hbs');

// Web Pages
app.use(express.static(__dirname));


app.get('/', (request, response) => {
    ssn = request.session;
    response.render('index.hbs', {
        title: "Home Page",
        header: "Welcome to Home!"
    });
    ssn.comport;
    ssn.command;
});
//
// app.post('/register', function (request, response) {
//     var db = utils.getDb();
//     db.collection('users').insertOne(request.body);
//     response.render('index.hbs', {
//         success_register: 'Thank You for Registering!'
//     });
// });

app.post('/register', function (request, response) {
    var db = utils.getDb();
    request.body["data"] = "";
    db.collection('users').find(request.body).toArray((err, result) => {
        if (result.length === 0) {
            db.collection('users').insertOne(request.body);
            response.render('index.hbs', {
                success_register: 'Thank You for Registering!'
            })
        }else{
            response.render('index.hbs', {
                success_register: 'Account Already Exists'
            })
        }
    });
});


app.get('/code', (request, response) => {
    response.render('code.hbs', {
        title: 'Code Page',
        header: "This is about me!",
        username: ssn.username
    });
});

app.post('/code-save', (request, response) => {
    var db = utils.getDb();

    username = ssn.username
    console.log(username);

    data = request.body.data
    console.log(data);

     db.collection('users').insertOne({username: username, data: data});
    //db.collection.update(find(username), data: data)
    // db.collection('users').find(request.username).toArray((err, result) => {
    //
    //
    //     }
    response.render('code.hbs', {
        success: 'File Has Been Saved!'
    })
})

app.get('/code-get', function (request, response) {
    var db = utils.getDb();
    username = request.body.username;
    console.log(username);

    db.collection('users').find({username: username}).toArray((err, items) => {
        response.send(items);
    });

});

app.listen(8080, () => {
    console.log('Server is up and running');
    utils.init()
});


app.post('/login', (request, response) => {
    ssn = request.session;
    var db = utils.getDb();
    db.collection('users').find(request.body).toArray((err, result) => {
        if (result.length === 0) {
            response.render('index.hbs', {
                success_login: 'Invalid Login Info!'
            })
        } else {
            response.render('code.hbs', {
                // response.render('index.hbs', {
                //     success_login: 'You Are Now Logged In!'
            })
            ssn.username = request.body.username;
            ssn.password = request.body.password;
        }
    });
});
