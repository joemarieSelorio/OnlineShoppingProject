var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Product = require('./models/product');
var port = 3300;
app.set("view engine", "ejs");

//incorporate stylesheet
app.use(express.static(__dirname + "/public"));

//use to override post method into update and delete method
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/onlineshop", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//LANDING ROUTE
app.get("/", function(req, res){
    res.render('landing')
});

//##################### MANAGE Route############################
app.get("/manage", function(req, res){
    //get campgrounds in database
    Product.find({},function(err, allProducts){
        if(err){
            console.log("Something went wrong retrieving campgrounds");
        }else{
            res.render("manage", {products: allProducts});
        }
     });
});

app.get("/manage/:id", function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            res.redirect("/")
        }else{
           res.render("edit", {products: foundProduct});
           console.log(foundProduct)
        }
    });
})
app.delete("/delete/:id", function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/")
        }else{
            res.redirect("/products");
        }
    })
});

app.put("/manage/:id", function(req, res){
    //find and update correct product
    Product.findByIdAndUpdate(req.params.id, req.body.products, 
            function(err ,updatedProduct){
                if(err){
                    res.redirect("/");
                }else{
                    res.redirect("/products");
                }
        });
});



// PRODUCT
app.get("/products/", function(req, res){
    //get campgrounds in database
    Product.find({},function(err, allProducts){
        if(err){
            console.log("Something went wrong retrieving campgrounds");
        }else{
            res.render("index", {products: allProducts});
        }
     });
});

//ADD
app.get("/add", function(req, res){
    res.render('add')
});

app.post("/add", function(req, res){
    //get data from a form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var newProduct = {name: name, image: image, price: price, quantity: quantity};
   //Create new Product and save to DB
   Product.create(newProduct, function(err, product){
      if(err){
          console.log(err)
      }else{
          // redirect to index page.
            console.log(newProduct)
           res.redirect("/");
      }
   });
});
//buy route
app.get("/products/buy/:id", function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            res.redirect("/")
            console.log(err)
        }else{
           res.render("buy", {products: foundProduct});
        }
    });
});

app.put("/products/buy/:id", function(req, res){
    console.log(req.body);
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            res.redirect("/")
            console.log(err)
        }else{
            foundProduct.quantity = Number(req.body.quantity);
            Product.findByIdAndUpdate(req.params.id, foundProduct, 
                function(err ,updatedProduct){
                    if(err){
                        res.redirect("/");
                    }else{
                        console.log(updatedProduct)
                        res.redirect("/products/buy/" + req.params.id);
                    }
            });
        } 
    })
});


app.listen(port, ()=>{
    console.log(`this app listens on port ${port}`);
});