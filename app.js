const browserSync = require('browser-sync');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    // res.status(200).json({user:'toby'});
    res.render('index');
});

app.get('/cards', (req, res)=>{
    res.render('card', {
        prompt: 'Who is burried in Grant\'s tomb',
        // hint: "Think about who's tomb it is"
        colors
    });
})

app.get('/hello', (req, res)=>{
    res.status(200).send('<h1>Hello, JavaScript Developer. Learn more at http://referrals.trhou.se/gustavoamezcua</h1>');
});

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});