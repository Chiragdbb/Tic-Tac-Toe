const allBoxes = document.querySelectorAll("[data-box]");
const player = document.querySelector("[data-player]");
const reset = document.querySelector("[data-reset]");
let gameGrid = ["", "", "", "", "", "", "", "", ""];
const winGrid = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[2, 5, 8],
	[1, 4, 7],
	[2, 4, 6],
	[0, 4, 8],
];

let currentPlayer = "X";
//
allBoxes.forEach((box, index) => {
	box.addEventListener("click", () => {
		togglePlayer(box, index);
		gameResult();
	});
});

function togglePlayer(box, index) {
	// toggle player
	box.innerHTML = currentPlayer;
	gameGrid[index] = currentPlayer;
	currentPlayer === "O" ? (currentPlayer = "X") : (currentPlayer = "O");
	player.innerHTML = `Current Player - ${currentPlayer}`;
	box.style.pointerEvents = "none";
}

function gameResult() {
	let result = "";
	winGrid.forEach((pos) => {
		// winner
		if (
			(gameGrid[pos[0]] !== "" ||
				gameGrid[pos[1]] !== "" ||
				gameGrid[pos[2]] !== "") &&
			gameGrid[pos[0]] === gameGrid[pos[1]] &&
			gameGrid[pos[1]] === gameGrid[pos[2]]
		) {
			if (gameGrid[pos[0]] === "X") {
				result = "X";
			} else {
				result = "O";
			}
			allBoxes[pos[0]].style.backgroundColor = "rgba(0, 255, 0, 0.3)";
			allBoxes[pos[1]].style.backgroundColor = "rgba(0, 255, 0, 0.3)";
			allBoxes[pos[2]].style.backgroundColor = "rgba(0, 255, 0, 0.3)";
		}
		// found winner
		if (result !== "") {
			allBoxes.forEach((box) => (box.style.pointerEvents = "none"));
			player.innerHTML = `Winner Player - ${result}`;
			reset.classList.add("active");
		}
	});
    // game tied
	let empty = 0;
	gameGrid.forEach( val =>{
        if(val !== ""){
            empty++
        }
    })
	if (empty === 9 && result === "") {
		player.innerHTML = `Game Tied !`;
		reset.classList.add("active");
	}
}

function resetGame() {
	allBoxes.forEach((box) => {
		box.innerHTML = "";
		gameGrid = ["", "", "", "", "", "", "", ""];
		box.style.backgroundColor = "transparent";
		box.style.pointerEvents = "initial";
		player.innerHTML = "Current Player - X";
		currentPlayer = "X";
		reset.classList.remove("active");
	});
}

reset.addEventListener("click", resetGame);
