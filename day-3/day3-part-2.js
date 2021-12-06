const fs = require('fs');
const { uptime } = require('process');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error occured: ", err);
    return;
  }

  var arr = data.split("\n");

  let is_one = false;
  let ones = [];
  let one_current = 0;
  var ones_with_position = [];
  var zeros_with_position = [];

  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr[i].length; j++) {
      var num = arr[i][j];
      if (num === "1") {
        is_one = true;
      }

      one_current = is_one == true ? 1 : 0;
      ones[j] = ones[j] ? (ones[j] + one_current) : one_current;
      

      if (is_one == true) {
        if (ones_with_position[j]) {
          ones_with_position[j].push(arr[i]);
        }
        else {
          ones_with_position[j] = new Array();
          ones_with_position[j].push(arr[i]);
        }
      } 
      else
      {
        if (zeros_with_position[j]) {
          zeros_with_position[j].push(arr[i]);
        }
        else {
          zeros_with_position[j] = new Array();
          zeros_with_position[j].push(arr[i]);
        }
      }

    is_one = false;
  }
}

  var o2_remaining = [];
  var co2_remaining = [];


  var ones_count = ones[0];
  var zeros_count = arr.length - ones_count;

  if (ones_count >= zeros_count) {
    o2_remaining = ones_with_position[0];
    co2_remaining = zeros_with_position[0];
  }
  else {
    o2_remaining = zeros_with_position[0];
    co2_remaining = ones_with_position[0];
  }

    for (let i = 1; i<ones.length; i++) {
      if (o2_remaining.length ==1) {
        break;
      }
      var ones_count = o2_remaining.filter(function(n) { 
        return n[i] === "1"
      }).length;

      var zeros_count = o2_remaining.length - ones_count;

      if (ones_count >= zeros_count) {
        o2_remaining = o2_remaining.filter(function(n) {
          return ones_with_position[i].indexOf(n) !== -1;
      });
      }
      else {
        o2_remaining = o2_remaining.filter(function(n) {
          return zeros_with_position[i].indexOf(n) !== -1;
      });
      }
    }


    for (let i = 1; i<ones.length; i++) {
      if (co2_remaining.length ==1) {
        break;
      }
      var ones_count = co2_remaining.filter(function(n) { 
        return n[i] === "1"
      }).length;
      var zeros_count = co2_remaining.length - ones_count;

      if (ones_count >= zeros_count) {
        co2_remaining = co2_remaining.filter(function(n) {
          return zeros_with_position[i].indexOf(n) !== -1;
      });
      }
      else {
        co2_remaining = co2_remaining.filter(function(n) {
          return ones_with_position[i].indexOf(n) !== -1;
      });
      }
    }

  var oxygen_generator_rating = parseInt(o2_remaining[0], 2);
  var co2_rating = parseInt(co2_remaining[0], 2);


  console.log(oxygen_generator_rating * co2_rating);
});
