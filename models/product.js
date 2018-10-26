var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    quantity: Number
})

module.exports = mongoose.model("Product", productSchema);