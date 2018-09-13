const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // eslint-disable-line
const path = require('path');

const index = require('./controllers/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, ()=> console.log("Server started port 3000"));

app.get('/', index);

// custom 500 page
app.use(function (err, req, res, next) {
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
    next();
});

// custom 404 page
app.use(function (req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});