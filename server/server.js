const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
require('dotenv').config();
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
require('./protection/passport')(passport);
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });


var indexRouter = require('./routes/index');
app.use('/api', indexRouter);






app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});






