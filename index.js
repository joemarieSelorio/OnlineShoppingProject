var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Product = require('./models/product');
const productRouter = require('./server/productRouter');
const manageRouter = require('./server/manageRouter');
const buyRouters = require('./server/buyRouter');
var port = 3300;
app.set("view engine", "ejs");

//incorporate stylesheet
app.use(express.static(__dirname + "/public"));

//use to override post method into update and delete method
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/onlineshop", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render('landing')
});

app.use('/', productRouter);
app.use('/', manageRouter);
app.use('/', buyRouters);

app.listen(port, ()=>{
    console.log(`this app listens on port ${port}`);
});