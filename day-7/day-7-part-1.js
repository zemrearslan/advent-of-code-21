const fs = require('fs');


fs.readFile('/input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error message:", err);
    return;
  }

  var arr = data.split(",").map((i) => parseInt(i));

  arr.sort((a,b) => a-b);
  let medianIndex;
  if (arr.length % 2 == 0) {
    var index = arr.length / 2;
    medianIndex = arr[index] > arr[index+1] ? index+1 : index;
  } else {
    medianIndex = Math.ceil(arr.length/2);
  }

  var targetCrab = arr[medianIndex];

  var result = arr.map(function(i) {
    var distance = targetCrab - i;
    var sign = Math.sign(targetCrab - i);
    return sign >=0 ? distance : (-1)*distance;
  }).reduce((a,b) => a+b);

  console.log(result);
});
