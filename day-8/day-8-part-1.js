const fs = require('fs');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error messsage:", err);
    return;
  }

  let input = data.split("\n");
  
  input = input.map(function(i) {
    var parts = i.split("|");
    var numbers = parts[1].trim();
    return numbers;
  });

  var count = 0;
  for (let i = 0; i < input.length; i++) {
    var numbersArray = input[i].split(" ");
    for (let k=0; k < numbersArray.length; k++) {
      var number = numbersArray[k];

      if (number.length == 2 ||
          number.length == 3 ||
          number.length == 4 ||
          number.length == 7) {
            count++;
      }
    }
  }

  console.log(count);  
});
