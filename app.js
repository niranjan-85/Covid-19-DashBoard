const express = require('express');
const BodyParser = require('body-parser')
const Router = require('./src/Routes/routes');

const app=express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('assets'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/images',express.static(__dirname + 'assets/images'))
app.use(BodyParser.urlencoded({extended: true}));


app.set('view engine','ejs');
app.set('views','./src/views');

const Routes = require('./src/Routes/routes');

app.get('/home',Routes);
app.get('/login',Routes);
app.get('/register',Routes);
app.get('/new',Routes);
app.get('/welcome',Routes)

app.listen(PORT,()=>{
    console.log('Server Up and Running');
})