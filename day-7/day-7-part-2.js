const fs = require('fs');


fs.readFile('/input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error message:", err);
    return;
  }

  let arr = data.split(",").map((i) => parseInt(i));

  arr.sort((a,b) => a-b);
  
  let result = 0;
  for (let i =0; i <= arr[arr.length-1]; i++) {
    let targetCrab = i;
    let total = 0;

    for (let k =0; k<arr.length; k++) {
      var distance = targetCrab - arr[k];
      var sign = Math.sign(distance);
      var positiveDistance = sign >=0 ? distance : (-1)*distance;
      total = total + (positiveDistance * (positiveDistance + 1) / 2);
    }

    if (i == 0 || total < result) {
      result = total;
    }
  }

  console.log(result);
});
