const fs = require('fs');

class Card {
  constructor(cardId) {
    this.numbers = new Array(5);
    for (let i = 0; i <5; i++) {
      this.numbers[i] = new Array(5);
    }
    this.markedNumbers = new Array(5);
    for (let i = 0; i <5; i++) {
      this.markedNumbers[i] = new Array(5);
    }
    this.rowsReached = new Array();
    for (let i = 0; i <5; i++) {
      this.rowsReached[i] = 5;
    }

    this.colsReached = new Array();
    for (let i = 0; i <5; i++) {
      this.colsReached[i] = 5;
    }

    this.cardId = cardId;
  }
}

fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }
  
  var arr = data.split("\n");
  var bingoNumbers = arr[0].split(",");
  var board = []; // Array<Card>
  let cardId =0;

  for (let i = 2; i < arr.length;i += 6) { 
    var card = new Card(cardId);
    cardId++;

    for (let j = 0; j<5; j++) {
      var row = arr[i+j].split(" ");
      row = row.filter(m => m.trim() !== "");
      for (let k=0; k< 5; k++) {
        card.numbers[j][k] = row[k];
      }
    }

    board.push(card);
  }

  var winningBoards = [];
  var bingoNumber = -1;
  let lastWinningCard = null;

  for (let i = 0; i < bingoNumbers.length; i++) {
    board = board.filter(i=> winningBoards.indexOf(i) == -1);
    for (let m = 0; m < board.length; m++) {
      let card = board[m];
      for (let j = 0; j<5; j++) {
        for (let k=0; k< 5; k++) {
          if (card.numbers[j][k] == bingoNumbers[i]) {
            card.markedNumbers[j][k] = 1;
            var remainingRows = card.rowsReached[j] - 1;
            var remainingCols = card.colsReached[k] - 1;
            card.rowsReached[j] = remainingRows;
            card.colsReached[k] = remainingCols;

            if (remainingRows == 0 || remainingCols == 0) {
              // Bingo!
              bingoNumber = bingoNumbers[i];

              lastWinningCard = card;
              
              winningBoards.push(card);
            }
          }
        }
      }
    }
  }

  let sum =0;
  for (let i = 0; i<5; i++) {
    for (let j = 0; j<5; j++) {
      if (lastWinningCard.markedNumbers[i][j] == 1) {
        continue;
      }
      else {
        sum = sum + parseInt(lastWinningCard.numbers[i][j]);
      }
    }
  }

  console.log(sum * bingoNumber);


});
