const fs = require('fs');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }

  var arr = data.split("\n");
 
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let i=0; i<arr.length; i++) {
    var fields = arr[i].split(" ");
    var direction = fields[0];
    var amount = parseInt(fields[1]);

    switch (direction) {
      case "forward":
        horizontal += amount;
        depth += aim * amount;
        break;
      case "down":
        aim += amount;
        break;
      case "up":
        aim -= amount;
        break;
      default:
        console.log("No direction matches!");
    }
  }
  console.log(horizontal * depth)
});
