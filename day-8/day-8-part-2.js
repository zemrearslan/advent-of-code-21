const fs = require('fs');


fs.readFile('./input', 'utf8' , (err, data) => {
  if (err) {
    console.error("Error message: ", err);
    return;
  }

  let input = data.split("\n");
  
  var signals = input.map(function(i) {
    var parts = i.split("|");
    var left = parts[0].trim();
    return left;
  });

  var numbers = input.map(function(i) {
    var parts = i.split("|");
    var right = parts[1].trim();
    return right;
  });

  let map;
  let others = [];
  let count = 0;
  for (let i = 0; i < signals.length; i++) {
    var signalsParsed = signals[i].split(" ");
    map = new Map();
    for (let k =0; k < signalsParsed.length; k++) {
      var signal = signalsParsed[k];
      if (signal.length == 2) {
        map.set(signal.split('').sort().join(''), '1');
      }
      else if (signal.length == 3) {
        map.set(signal.split('').sort().join(''), '7');
      }
      else if (signal.length == 4) {
        map.set(signal.split('').sort().join(''), '4');
      }
      else if (signal.length == 7) {
        map.set(signal.split('').sort().join(''), '8');
      }
      else {
        others.push(signal);
      }
    }

    for (let m=0; m < others.length; m++) {
      var target = others[m];
      var seven = [...map].find(([key, value]) => value === '7' )[0];
      var four = [...map].find(([key, value]) => value === '4')[0];
      if (target.length == 5) {
          // 2 || 3 || 5
          if (seven.split('').filter(i=> target.indexOf(i) > -1).length == seven.length) {
            // 3 -> has all elements of 7
            map.set(target.split('').sort().join(''), '3');

          }
          else if (four.split('').filter(i=> target.indexOf(i) > -1).length == 3) {
            // 5 -> has 3 common elements with 4
            map.set(target.split('').sort().join(''), '5');
          }
          else {
            map.set(target.split('').sort().join(''), '2');
          }
        }
        else {
          // 0 || 6 || 9
          if (seven.split('').filter(i=> target.indexOf(i) > -1).length == 2) {
             // 6 -> has 2 common elements with 7
             map.set(target.split('').sort().join(''), '6');
          }
          else if (four.split('').filter(i=> target.indexOf(i) > -1).length == four.length) {
            // 9 -> has all elements of 4
            map.set(target.split('').sort().join(''), '9');
          }
          else {
            map.set(target.split('').sort().join(''), '0');
          }
  
        }
    }
    
    let rowResult ='';
    var numbersParsed = numbers[i].split(" ");
    for(let m=0; m < numbersParsed.length; m++){
      var number = numbersParsed[m].split('').sort().join('');
      rowResult = rowResult + map.get(number);
    }
    
    count = count + parseInt(rowResult);

  }

  console.log(count);  
});
