const fs = require('fs');

fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }
  

  var arr = data.split("\n");
  let ones = [];
  let one_current = 0;

  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr[i].length; j++) {
      var num = arr[i][j];
      one_current = num === "1" ? 1 : 0;
      ones[j] = ones[j] ? (ones[j] + one_current) : one_current;
    }
  }

  var gamma_result = "";
  var epsilon_result = "";
  for (let i =0; i<ones.length; i++) {
    var ones_count = ones[i];
    var zeros_count = arr.length - ones_count;

    let concat = "0";
    if (ones_count > zeros_count) {
      concat ="1";
    }

    gamma_result = gamma_result + concat;
    epsilon_result = epsilon_result + (1-concat).toString();
  }

  console.log(parseInt(gamma_result, 2) * parseInt(epsilon_result, 2));
});
