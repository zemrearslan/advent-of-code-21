const { Console } = require('console');
const fs = require('fs');


fs.readFile('/input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error message: ", err);
    return;
  }

  let input = data.split("\n");
  
  let arr = [];
  let visitedArr = [];
 

  input.forEach(function(i, index) {
    var elements = i.split("");
    arr[index]= elements;
  });

  visitedArr = arr.slice().map(i=> i.map(k => 0));

  var neighbors_x = [-1, 0, 1, 0];
  var neighbors_y = [0, 1, 0, -1];

  var MAX_ROW_COUNT = arr.length;
  var MAX_COL_COUNT = arr[0].length;

  function isValidIndex(indexes) {
    var x = indexes[0];
    var y = indexes[1];
    var isValid = (x >= 0 && x < MAX_ROW_COUNT && y >= 0 && y < MAX_COL_COUNT);

    return isValid;
  }

  const result = [];

  for (let i =0; i < arr.length; i++) {
    for (let j=0; j < arr[0].length; j++) {
      var target = arr[i][j];
      if (visitedArr[i][j] == 1) {
        continue;
      }
      else {
        visitedArr[i][j] = 1;

        var top = [i + neighbors_x[0], j + neighbors_y[0]];
        var right = [i + neighbors_x[1], j + neighbors_y[1]];
        var bottom = [i + neighbors_x[2], j + neighbors_y[2]];
        var left = [i + neighbors_x[3], j + neighbors_y[3]];

        if (isValidIndex(top) == true) {
          if (arr[top[0]][top[1]] <= target) {
            continue;
          }
          else {
            visitedArr[top[0]][top[1]] = 1;
          }
        }
        if (isValidIndex(right) == true) {
          if (arr[right[0]][right[1]] <= target) {
            continue;
          }
          else {
            visitedArr[right[0]][right[1]] = 1;
          }
        }
        if (isValidIndex(left) == true) {
          if (arr[left[0]][left[1]] <= target) {
            continue;
          }
          else {
            visitedArr[left[0]][left[1]] = 1;
          }
        }
        if (isValidIndex(bottom) == true) {
          if (arr[bottom[0]][bottom[1]] <= target) { 
            continue;
          }
          else {
            visitedArr[bottom[0]][bottom[1]] = 1;
          }
        }

        result.push(target);

      }
    }
  }

  console.log(result);

  console.log(result.map(i=> parseInt(i)+1).reduce((a,b) => a+b));

});
