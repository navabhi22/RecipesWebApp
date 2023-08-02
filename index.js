const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');
const PORT ='4000';

app.engine('ejs',ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/recipesApp')
    .then(()=>{console.log('DB connected!')})
    .catch(e => console.log(e));

const productRoutes = require('./routes/recipes');

app.use(productRoutes);

app.get('/',(req,res)=>{
    res.send('Working Fine');
})
app.listen(PORT,(req,res)=>{
    console.log( `server is up at Port:${PORT}`);
})