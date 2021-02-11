
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const browserSync = require('browser-sync');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');
app.use('/static',express.static('public'));

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
});

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});