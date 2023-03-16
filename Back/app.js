const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const db = require("./db/sequelize");

const userRoutes = require('./routes/user');
const starshipsRoutes = require('./routes/starships');
const linkRoutes = require('./routes/link');
const hangarRoutes = require('./routes/hangar');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');

const path = require('path');



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/', starshipsRoutes);
app.use('/api/', hangarRoutes);
app.use('/api/', linkRoutes);
app.use('/api/', authRoutes);
app.use('/api/', eventRoutes);


db.sequelize.sync();



module.exports = app;