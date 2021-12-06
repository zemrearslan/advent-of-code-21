const fs = require('fs');
const { uptime } = require('process');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }

  var arr = data.split("\n");
  var bingoNumbers = arr[0].split(",");

  var map = new Map(); //number, rowsSeen
  var rowReached = new Map(); // rowIndex, count

  for (let i = 2; i<arr.length;i++) {
    rowReached.set(i, 5);
    if (i % 6 == 1) {
      // space between cards
      continue;
    }

    var row = arr[i].split(" ");
    row = row.filter(i=> i.trim() !== "");
    for (let j=0; j<5; j++) {
      var number = row[j];
      var rowsSeen = map.get(number);
      if (rowsSeen) {
        rowsSeen.push(i);
      } else {
        var rowsSeen = [];
        rowsSeen.push(i);
        map.set(number,rowsSeen);
      }
    }
  }

    var bingoRow = -1;
    var bingoNumber = -1;
    var lastSeenBingoNumberIndex = 0;

    for (let i = 0; i < bingoNumbers.length; i++) {
      if (bingoRow > -1) {
        break;
      }
      var num = bingoNumbers[i];
      var candidateRows = map.get(num);
      if (candidateRows) {
        for (let j=0; j< candidateRows.length; j++) {
          var row = candidateRows[j];
          var count = rowReached.get(row);
          var nextCount = count - 1;
          if (nextCount == 0) {
            // Bingo!
            bingoRow = row;
            bingoNumber = num;
            lastSeenBingoNumberIndex = i;
            break;
          }
          rowReached.set(row, count - 1);
        }
      }
      else {
        continue;
      }
    }

    
    if (bingoRow > 0) {
      var cardNumbers = [];
      var bingoNumbersSeen = bingoNumbers.filter((val, index) => index <= lastSeenBingoNumberIndex);
      var cardNumber = parseInt(Math.floor(bingoRow / 6));
      var cardStartIndex = (cardNumber * 6) + 2;

      for (let i=cardStartIndex; i < cardStartIndex + 5; i++) {
        var row = arr[i].split(" ");
        row = row.filter(i=> i.trim() !== "");
        for (let j=0; j<5; j++) {
          cardNumbers.push(row[j]);
        }
      }

      cardNumbers = cardNumbers.filter(i => bingoNumbersSeen.indexOf(i) == -1);

      var sum = cardNumbers.reduce((a,b) => parseInt(a)+parseInt(b));
      console.log(sum * bingoNumber);

    } else {
      console.log(-1);
    }

});
