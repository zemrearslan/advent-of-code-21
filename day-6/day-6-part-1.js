const fs = require('fs');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }
  
  var initialStateArr = data.split(",");
  var resultArr = initialStateArr.slice();
  let newSpawnCount = 0;
  for (let i =0; i < 80; i++) {
    for (let k =0; k < resultArr.length; k++) {
      if (parseInt(resultArr[k]) == 0) {
        resultArr[k] = 6;
        newSpawnCount++;
      }
      else {
        resultArr[k] = parseInt(resultArr[k]) - 1;
      }
    }

    while(newSpawnCount > 0) {
      resultArr.push(8);
      newSpawnCount--;
    }
  }

  console.log(resultArr.length);

});
