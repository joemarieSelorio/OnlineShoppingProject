var express = require("express");
const router = express.Router();
var Product = require('../models/product');

//##################### MANAGE Route############################
router.get("/products/manage", function(req, res){
    //get campgrounds in database
    Product.find({},function(err, allProducts){
        if(err){
            console.log("Something went wrong retrieving campgrounds");
        }else{
            res.render("manage", {products: allProducts});
        }
     });
});

router.get("/products/manage/:id", function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            res.redirect("/")
        }else{
           res.render("edit", {products: foundProduct});
           console.log(foundProduct)
        }
    });
})
router.delete("/products/manage/:id", function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/")
        }else{
            res.redirect("/products");
        }
    })
});

router.put("/products/manage/:id", function(req, res){
    //find and update correct product
    Product.findByIdAndUpdate(req.params.id, req.body.products, 
            function(err ,updatedProduct){
                if(err){
                    res.redirect("/");
                }else{
                    res.redirect("/products/manage");
                }
        });
});

module.exports = router;