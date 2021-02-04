require('dotenv').config();
require('./configs/db.config');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app_name = require('./package.json').name;
const debug = require('debug')(
    `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// require database configuration


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static(__dirname + '/public')); //esta es la ruta que me sirve
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const index = require('./routes/index');
app.use('/', index);

// copiar este enlace para ver lo que hago 
app.listen(3000, () => console.log('My Cinema project running on port 3000 🎧 🥁 🎸 🔊'));
module.exports = app;