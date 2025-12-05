"use strict";

const printForecast = function (arr) {
  let mainString = [];
  for (let i = 0; i < arr.length; i++) {
    mainString += `... ${arr[i]}°C in ${i + 1} days `;
  }
  return mainString + " ...";
};

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
