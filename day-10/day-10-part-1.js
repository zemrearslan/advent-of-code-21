const { Console } = require('console');
const fs = require('fs');


fs.readFile('/input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error message: ", err);
    return;
  }

  let input = data.split("\n");

  let openingStack = [];
  
  let errors = [];
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
          openingStack.push(element);
          break;
        case "{":
          openingStack.push(element);
          break;
        case "[":
          openingStack.push(element);
          break;
        case "<":
          openingStack.push(element);
          break;
        case ")":
          if (openingStack[openingStack.length - 1] == "(") {
            openingStack.pop();
            break;
          }
          else {
            errorFound = true;
            errors.push(element);
            break;
          }
        case "]":
          if (openingStack[openingStack.length - 1] == "[") {
            openingStack.pop();
            break;
          }
          else {
            errorFound = true;
            errors.push(element);
            break;
          }
        case "}":
          if (openingStack[openingStack.length - 1] == "{") {
            openingStack.pop();
            break;
          }
          else {
            errorFound = true;
            errors.push(element);
            break;
          }
        case ">":
          if (openingStack[openingStack.length - 1] == "<") {
            openingStack.pop();
            break;
          }
          else {
            errorFound = true;
            errors.push(element);
            break;
          }
      }
    }
  }


  let score = 0;


  errors.forEach(function(i) {
    if (i == ")") {
      score = score + 3;
    }
    else if (i == "]") {
      score = score + 57;
    }
    else if (i == ">") {
      score = score + 25137;
    }
    else if (i == "}") {
      score = score + 1197;
    }
  });

  console.log(score);

});
