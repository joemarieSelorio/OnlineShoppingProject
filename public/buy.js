
var quantityTxt = document.querySelector("#quantity");
var buyBtn = document.querySelector("#buyBtn");
var total = 0;
var ans = 0;
var qty = 0;
var remain = 0;

quantityTxt.addEventListener("input", function(){
    var qty = parseInt(document.getElementById('quantity').value);
    var total = +document.getElementById('totalLabel').innerText;
    var remain = total - qty;
        document.getElementById("remainingtxt").value = remain
})

buyBtn.addEventListener("input", function(){
    var qty = parseInt(document.getElementById('quantity').value);
    var total = +document.getElementById('totalLabel').innerText;
    var remain = total - qty;
        document.getElementById("remainingtxt").value = remain
})

