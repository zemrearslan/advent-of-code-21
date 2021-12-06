const fs = require('fs');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }

  var initialData = data.split(",");
  var result = new Array();

  for (let i=0; i<9; i++) {
    result[i] = 0;
  }

  for (let k=0; k < initialData.length; k++) {
    var val = parseInt(initialData[k]);
    result[val] = result[val] + 1;
  }

  let zeroCount = 0;
  for (let i = 0; i < 256; i ++) {
    zeroCount = 0;
    for (let k = 0; k<9; k++) {
      var count = result[k];

      if (k == 0 && count > 0) {
        zeroCount = zeroCount + count;
        continue;
      }
      else if (count == 0) {
        continue;
      }
      else {
        result[k] = result[k] - count;
        result[k-1] = result[k-1] + count;      
      }
    }

    if (zeroCount > 0) {
      result[0] = result[0] - zeroCount;
      result[8] = result[8] + zeroCount;
      result[6] = result[6] + zeroCount;
    }

  }

  console.log(result.reduce((a,b)=>a+b));

});
