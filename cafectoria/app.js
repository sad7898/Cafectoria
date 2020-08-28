const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));






app.get('/test',function(req,res){
 res.json({"it":"works"})
})
app.get('*', function (req, res) {
    console.log("it's working bois")
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    
 });
 
 
 app.listen(process.env.PORT || 8080, () => (console.log("server is listening")));