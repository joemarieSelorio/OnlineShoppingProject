var buyBtn = document.getElementById("buyBtn");
var qtyText = document.getElementById("qtyText").textContent;
var totalQty = document.getElementById("totalQty").textContent;

var qty = parseInt(qtyText, 10);
var total = parseInt(totalQty, 10);

buyBtn.addEventListener("click", function(){
var remainingQty = total - qty;
console.log(remainingQty);
});