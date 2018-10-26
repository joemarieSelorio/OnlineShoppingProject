var express = require("express");
const router = express.Router();
var Product = require('../models/product');

router.get("/products", function(req, res){
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
router.get("/products/add", function(req, res){
    res.render('add')
});

router.post("/products/add", function(req, res){
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
           res.redirect("/products");
      }
   });
});

module.exports = router;