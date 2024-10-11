"use strict";
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const adminRouter = require('./routes/adminRouter');
mongoose.connect('mongodb://localhost:27017/usersdatabase')
    .then(() => {
    console.log('mongodb connceted successfully');
});
const app = express();
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('assests', express.static(path.join(__dirname, 'public/assests')));
app.use('/', adminRouter);
app.listen(12000, () => {
    console.log('the server is running at http://localhost:12000');
});
