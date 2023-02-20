var currentPlayer = "X";
var cells = document.querySelectorAll("td");
var message = document.getElementById("message");

function checkWin() {
	var rows = [		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8]
	];
	var cols = [		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8]
	];
	var diagonals = [		[0, 4, 8],
		[2, 4, 6]
	];
	var winLines = rows.concat(cols, diagonals);

	for (var i = 0; i < winLines.length; i++) {
		var line = winLines[i];
		var cell1 = cells[line[0]];
		var cell2 = cells[line[1]];
		var cell3 = cells[line[2]];
		if (cell1.textContent !== "" && cell1.textContent === cell2.textContent && cell2.textContent === cell3.textContent) {
			return cell1.textContent;
		}
	}
	return null;
}

function resetGame() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].textContent = "";
		cells[i].style.backgroundColor = "";
		cells[i].addEventListener("click", handleTurn);
	}
	message.textContent = "";
	currentPlayer = "X";
}

function handleTurn(event) {
	var cell = event.target;
	if (cell.textContent !== "") {
		return;
	}
	cell.textContent = currentPlayer;
	cell.style.backgroundColor = "#334455";
	var winner = checkWin();
	if (winner) {
		message.textContent = winner + " wins!";
		for (var i = 0; i < cells.length; i++) {
			cells[i].removeEventListener("click", handleTurn);
		}
	} else if (Array.from(cells).every(cell => cell.textContent !== "")) {
		message.textContent = "It's a tie!";
	}
	currentPlayer = currentPlayer === "X" ? "O" : "X";
}

for (var i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", handleTurn);
}

document.getElementById("reset").addEventListener("click", resetGame);