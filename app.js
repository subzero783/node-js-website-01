const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    // res.status(200).json({user:'toby'});
    res.render('index');
});

app.get('/hello', (req, res)=>{
    res.status(200).send('<h1>Hello, JavaScript Developer</h1>');
});

app.listen(3000, ()=>{
    console.log('The application is running on localhost:3000');
});