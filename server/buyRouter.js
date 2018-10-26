var express = require("express");
const router = express.Router();
var Product = require('../models/product');


//buy route
router.get("/products/buy/:id", function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            res.redirect("/")
            console.log(err)
        }else{
           res.render("buy", {products: foundProduct});
        }
    });
});

router.put("/products/buy/:id", function(req, res){
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
                        res.redirect("/products/");
                    }
            });
        } 
    })
});

module.exports = router;