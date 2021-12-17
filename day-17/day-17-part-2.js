let xStart = 20;
let xEnd = 30;
let yStart = -10;
let yEnd = -5;

function isXInBox(x) {
  return xStart <= x && x <= xEnd;
}

function isYInBox(y) {
  return yStart <= y && y <= yEnd;
}


function solve() {
  for (let xVelocity = -1000; xVelocity < 1000; xVelocity ++) {
    for (let yVelocity = -1000; yVelocity < 1000; yVelocity++) {
      reachesTarget(xVelocity, yVelocity);
    }
  }

  return count;
 
}

let count = 0;

function reachesTarget(xVelocity, yVelocity) {
  let x = 0;
  let y = 0;
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

    if (isXInBox(x) && isYInBox(y)) {
      count++;
      return;
    }
  }
}

console.log(solve());