const express = require('express');
const bcrypt = require('bcrypt');
const Router = express.Router();
var users = [];

function isUser(username){
    for(var i=0;i<users.length;i++){
        if(users[i]['username'] === username){
            return 1;
        }
    }
    return 0;
}

function exists(username,password){
    for(var i=0;i<users.length;i++){
        if(users[i]['username']===username ){
            console.log("here")
            return 1;
        }
    }
    return 0;
} 


Router.get('/home',(req,res)=>{
    res.render('index.ejs');
    res.end();
})

Router.get('/login',(req,res)=>{
    res.render('login.ejs');
    res.end();
})

Router.get('/welcome',async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    hashed = await bcrypt.hash(req.query.password,salt)
    if(exists(req.query.username,hashed)){
        res.render('symptoms.ejs',{'name':req.query.username});
    }
    else{
        res.redirect('/login');
    }
    res.end();
})

Router.get('/register',(req,res)=>{
    res.render('register.ejs');
    res.end();
})

Router.get('/new',async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    if(isUser(req.query.username)){
        console.log('User already Exists')
        res.redirect('/register');
    }
    else{
        hashed = await bcrypt.hash(req.query.password,salt)
        users.push(
            {   'name':req.query.name,
                'username':req.query.username,
                'password': hashed
            }
        );
        res.redirect('/login');
    }
    console.log(users);
    res.end();

})

Router.get('/check',(req,res)=>{
    res.render('login.ejs');
})

module.exports=Router;

