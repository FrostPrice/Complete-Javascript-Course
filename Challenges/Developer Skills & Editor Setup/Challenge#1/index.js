/*
Given an array of forecasted maximum temperatures, the thermometer displays a
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up
into sub-problems!

Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]
GOOD LUCK 😀
*/

// 1) Understanding the problem
// - Array transformed to string, separated by ...
// - What is the X days? Answer: index + 1

// 2) Breaking up into sub-problems
// - Transform array into a string
// - Transformeach elementto string with ºC
// - String needs to contain day (index + 1)
// - Add ...between elements and start and end of string
// - Log string to console

"use strict";

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

// MY SOLUTION
console.warn("---- MY SOLUTION ----");
const printForecast1 = function (arr) {
  let temperatures = "";
  for (let i = 0; i < arr.length; i++) {
    temperatures += `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log("... " + temperatures);
};

printForecast1(data1);

// JONAS SOLUTION
console.warn("---- JONAS SOLUTION ----");

console.log(`... ${data1[0]}ºC ... ${data1[1]}ºC ... ${data1[2]}ºC ...`);

const printForecast2 = function (arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str = str + `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log("..." + str);
};
printForecast2(data1);

// 2+3=5+4=9
// [2,3,4]
