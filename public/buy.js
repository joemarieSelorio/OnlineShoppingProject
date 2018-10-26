

var buyBtn = document.querySelector("#buyBtn");
var qtyText = document.querySelector("#qtyText");
var totalQty = document.querySelector("#totalQty");
var remainingLabel = document.querySelector("#remaining");


var total = 0;
var ans = 0;
var remaining = 0;
var qty = 0;

buyBtn.addEventListener("click", function(){
    var qty = parseInt(document.getElementById('qtyText').value);
    var total = +document.getElementById('totalQty').innerText;
    var remain = total - qty;
    remainingLabel.textContent = remain;
})