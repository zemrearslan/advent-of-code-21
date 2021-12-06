const fs = require('fs');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }
  
  var map = new Map();
  var numOfPoints = 0;
  function addToMap(candidateCoords) {
    for (let i=0; i<candidateCoords.length; i++) {
      var val = map.get(candidateCoords[i]);
      if (val) {
       map.set(candidateCoords[i], val+1);
      }
      else {
        map.set(candidateCoords[i], 1);
      }
    }
  }

  var arr = data.split("\n");
  
  for (let i =0; i < arr.length; i++) {
    var coords = arr[i].split(" -> ");
    var start = coords[0].split(",");
    var end = coords[1].split(",");
    var x1 = parseInt(start[0]);
    var y1 = parseInt(start[1]);

    var x2 = parseInt(end[0]);
    var y2 = parseInt(end[1]);

    var candidateCoords = [];
    if (x1 == x2) {
      if (y1 > y2) {
        while(y1 >= y2) {
          candidateCoords.push(x1.toString() + ","+ y1.toString());
          y1--;
        }
      }
      else {
        while(y1 <= y2) {
          candidateCoords.push(x1.toString() + ","+ y1.toString());
          y1++;
        }
      }
    }
    else if (y1 == y2) {
      if (x1 > x2) {
        while(x1 >= x2) {
          candidateCoords.push(x1.toString() + ","+ y1.toString());
          x1--;
        }
      }
      else {
        while(x1 <= x2) {
          candidateCoords.push(x1.toString() + ","+ y1.toString());
          x1++;
        }
      }
    }
    else {  
      if (x1 > x2) {
        if (y1 > y2) {
          while (x1 >= x2 && y1 >= y2) {
            candidateCoords.push(x1.toString() + "," + y1.toString());
            x1--;
            y1--;
          }
        } else {
          while (x1 >= x2 && y1 <= y2) {
            candidateCoords.push(x1.toString() + "," + y1.toString());
            x1--;
            y1++;
          }
        }
      }
      else {
        if (y1 > y2) {
          while(x1 <= x2 && y1>=y2) {
            candidateCoords.push(x1.toString() + "," + y1.toString());
            x1++;
            y1--;
          }
        } else {
          while(x1 <= x2 && y1<=y2) {
            candidateCoords.push(x1.toString() + "," + y1.toString());
            x1++;
            y1++;
          }
        }
      }
    }

    addToMap(candidateCoords);
  }

  for (let val of map.values()) {
    if (val > 1) {
      numOfPoints++;
    }
  }

  console.log(numOfPoints);

});
