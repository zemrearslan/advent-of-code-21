const fs = require('fs');


fs.readFile('/input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error message: ", err);
    return;
  }

  let input = data.split("\n");

  let openingStack = new Array(input.length);

  for (let i=0; i < openingStack.length; i++) {
    openingStack[i] = new Array();
  }

  let errorLines = [];
  for (let i =0; i < input.length; i++) {
    let line = input[i];
    let errorFound = false;
    for (let k =0; k < line.length; k++) {
      if (errorFound) {
        break;
      }
      let element = line[k];
      switch(element) {
        case "(":
          openingStack[i].push(element);
          break;
        case "{":
          openingStack[i].push(element);
          break;
        case "[":
          openingStack[i].push(element);
          break;
        case "<":
          openingStack[i].push(element);
          break;
        case ")":
          if ( openingStack[i][ openingStack[i].length - 1] == "(") {
            openingStack[i].pop();
            break;
          }
          else {
            errorFound = true;
            errorLines.push(i);
            break;
          }
        case "]":
          if ( openingStack[i][ openingStack[i].length - 1] == "[") {
            openingStack[i].pop();
            break;
          }
          else {
            errorFound = true;
            errorLines.push(i);
            break;
          }
        case "}":
          if ( openingStack[i][ openingStack[i].length - 1] == "{") {
            openingStack[i].pop();
            break;
          }
          else {
            errorFound = true;
            errorLines.push(i);
            break;
          }
        case ">":
          if ( openingStack[i][ openingStack[i].length - 1] == "<") {
            openingStack[i].pop();
            break;
          }
          else {
            errorFound = true;
            errorLines.push(i);
            break;
          }
      }
    }
  }

  let corrections = new Array(input.length);

  for (let i=0; i < corrections.length; i++) {
    corrections[i] = new Array();
  }

  for (let i =0; i < input.length; i++) {
    if (errorLines.indexOf(i) >= 0) {
      continue;
    }

    var stack = openingStack[i];
    for (let k =0; k < stack.length; k++) {
      if (stack[k] == "(") {
        corrections[i].push(")");
      }
      if (stack[k] == "{") {
        corrections[i].push("}");
      }
      if (stack[k] == "[") {
        corrections[i].push("]");
      }
      if (stack[k] == "<") {
        corrections[i].push(">");
      }
    }
  }

  corrections = corrections.filter(i => i.length > 0);

  let correctionsScore = [];

  for (let i = 0; i < corrections.length; i++) {
    let correction = corrections[i].reverse();
    let score = 0;

    for (let k =0; k < correction.length; k++) {
      if (correction[k] == ")") {
        score = score * 5 + 1;
      }
      else if (correction[k] == "}") {
        score = score * 5 + 3;
      }
      else if (correction[k] == ">") {
        score = score * 5 + 4;
      }
      else if (correction[k] == "]") {
        score = score * 5 + 2;
      }
    }

    correctionsScore[i] = score;
  }
  
  correctionsScore = correctionsScore.sort((a,b) => a-b);
  var index = Math.floor(correctionsScore.length / 2);
  console.log(correctionsScore[index]);

});
