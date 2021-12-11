const fs = require('fs');


fs.readFile('/input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error message: ", err);
    return;
  }

  let input = data.split("\n");
  input = input.map(i => i.split("").map(k => parseInt(k)));

  var ROW_COUNT = input.length;
  var COL_COUNT = input[0].length;

  let flashed = new Array(ROW_COUNT);
  for (let i =0; i<ROW_COUNT; i++) {
    flashed[i] = new Array(COL_COUNT);
  }


  var neighbor_indices = [[-1, -1], [-1,0], [-1,1], [0, 1], [1,1], [1,0], [1,-1], [0, -1]];

  function isValidIndex(indices) {
    var x = indices[0];
    var y = indices[1];
    var isValid = (x >= 0 && x < ROW_COUNT && y >= 0 && y < COL_COUNT);

    return isValid;
  }

  let flashCount = 0;
  function flash(target_indices) {
    input[target_indices[0]][target_indices[1]] = 0;
    setFlashed(target_indices);
    flashCount++;
    var neighbors = getNeighbors(target_indices);
    for (let k=0; k < neighbors.length; k++) {
      let neighbor_index = neighbors[k];
      if (!isValidIndex(neighbors[k])) {
        continue;
      } 
      else 
      {
        if (input[neighbor_index[0]][neighbor_index[1]] <= 9) {
          input[neighbor_index[0]][neighbor_index[1]]++;

          if (input[neighbor_index[0]][neighbor_index[1]] > 9) {
            if (!hasFlashed(neighbor_index)){
              flash(neighbor_index);
            }
          }
        }
        else if (input[neighbor_index[0]][neighbor_index[1]] > 9) {
          if (!hasFlashed(neighbor_index)){
            flash(neighbor_index);
          }
        }
      }
    }
  }

  function hasFlashed(target_indices) {
    return flashed[target_indices[0]][target_indices[1]] == 1;
  }

  function setFlashed(target_indices) {
    flashed[target_indices[0]][target_indices[1]] = 1;
  }

  function unsetAllFlashed() {
    flashed = flashed.map(i=> i.map(k=> 0));
  }


  function getNeighbors(targetIndices) {
    return neighbor_indices.map(item => [item[0] + targetIndices[0],item[1] + targetIndices[1]]);
  }


  for (let step=0; step < 100; step++) {
    unsetAllFlashed();
    for (let i=0; i < ROW_COUNT; i++) {
      for (let k =0; k < COL_COUNT; k++) {
        var target_indices = [i,k];
       
        if (input[i][k] <= 9) {
          input[i][k] = input[i][k] + 1;

          if (input[i][k] > 9) {
            if (!hasFlashed(target_indices)){
              flash(target_indices);
            }
          }
        }
        else if (input[i][k] > 9) {
          if (!hasFlashed(target_indices)){
            flash(target_indices);
          }
        }
      }
    }

    for (let f =0; f < ROW_COUNT; f++) {
      for (let n =0; n<COL_COUNT; n++ ) {
        if (flashed[f][n] == 1) {
          input[f][n] = 0;
        }
      }
    }
  }

  console.log(flashCount);

});
