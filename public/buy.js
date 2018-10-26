var buyBtn = document.getElementById("#buyBtn");
var qtyText = document.getElementById("qtyText").textContent;
var qty = parseInt(qtyText, 10);

buyBtn.addEventListener("click", function(){

	score.style.visibility = "hidden";
	if(!isGameOver){
	p1Score++;
		if(p1Score === winningScore){
			score1.classList.add("winner");
			isGameOver = true;

		}
			score1.textContent = p1Score;

	}
	
});