let xStart = 156;
let xEnd = 202;
let yStart = -110;
let yEnd = -69;

function isXInBox(x) {
  return xStart <= x && x <= xEnd;
}

function isYInBox(y) {
  return yStart <= y && y <= yEnd;
}


function solve() {
  let maxYPosition = 0;

  for (let xVelocity = 0; xVelocity < 500; xVelocity ++) {
    for (let yVelocity = 0; yVelocity < 500; yVelocity++) {
      var maxY = reachesTarget(xVelocity, yVelocity);
      if (maxYPosition < maxY) {
        maxYPosition = maxY;
      }
      
    }
  }

  return maxYPosition;
 
}

function reachesTarget(xVelocity, yVelocity) {
  let x = 0;
  let y = 0;
  let maxY = 0;
  while (y >= yStart && x <= xEnd) {
    x = x + xVelocity;
    y = y + yVelocity;
    if (xVelocity > 0) {
      xVelocity--;
    }
    else if (xVelocity < 0) {
      xVelocity++;
    }
    yVelocity = yVelocity - 1;

    if (maxY < y) {
      maxY = y;
    }
    if (isXInBox(x) && isYInBox(y)) {
      return maxY
    }
  }

  return -1;
}

console.log(solve());