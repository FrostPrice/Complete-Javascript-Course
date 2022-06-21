///////////////////////////////////////////
// Setting up Prettier and VS Code
// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
// Download the Prettier extention for VSCode
// Go to Prefereneces/ Default Formatter and selecte the option esbenp.prettier-vscode
// Stll on optiins see if the Format On Save is On

const x = '23';

// To configure Prettier to be the format you want, create a new file on the project named .prettierrc

const calcAge = birthYear => 2037 - birthYear;

// A Snippet is is used to automate something we do frequently
console.log(calcAge(1991));
// The $1 on the Snippet Body will make taht the cursor appear there where the $1 is placed

// It may be good to install the extension TODO Highlights

///////////////////////////////////////////
// Installing Node.js and Setting Up a Dev Environment
// To make so that you don't have to refresh the page, download the VSCode extension Live Server or the Node.js and NPM

// VSCode has a built-in Terminal
// Instal the NPM package using: npm install live-server -g
// To run the Live Server from the Terminal write: live-server

///////////////////////////////////////////
// Learning How to Code

// Always have a goal in mind
// Understant the Code
// Use what you learned imediatly
// Take notes
// Make small challenges for yourself
// Go to CodeWars for Challenges
// Practice a Lot
// Make yourself be able to get out of the Tutorial
// Don't be frustrated
// Write as much code as you can
// Don't focus on making the Perfect Code
// Never lose Motivation
// You'll never know everything about programming
// Just taking a course won't make you a developer
// You never stops learning how to Code

///////////////////////////////////////////
// How to Think Like a Developer: Become a Problem Solver

// A good developer know how to solve problems efectivly

// When you find a Problem stay calm and slow
// Always think on a plan before jumping into solving the Problem
// Take a Logical and Rational approach when soving Problem

// 4 Steps into solving Problems:
// 1º Make sure you understand the Problem. Ask the right questions to take a clear picture of the Problem
// 2º Divide and Conquer. Break the big Problem into smaller ones
// Make like a Task List of what you need to implement
// 3º Make as much research as you want. Only do this after you failed or don't know how to do this at your own
// 4 º For the big Problems, write some code that you'll understand and not even the computer, so after you undertood the code, convert it into a working code

// Always have curiosity for how the thing works in the world

///////////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute mas and min temperatures?
// - What's a sensor error? And what to do? Answer: ignore the errors

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// calcTempAmplitude([3, 7, 4]);
// // max = 3
// // max = 7

// PROBLEM 2:
// Function should now recieve 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? Answer: NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - How to merge 2 arrays? Answer: Merge 2 arrays

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

// Be descriptive when researching for solutions
// StackOverflow is good when searching for answers
// Don't copy the solution, write it yourself
// MDN explains how a buitl-in method of JavaScript works

///////////////////////////////////////////
// Debugging (Fixing Errors)

// Debuggin means finding, fixing and preventing errors nad bugs
// A Software Bug is a defect or problem in a program. A unexpected or unintended behavior is a bug
// Bug are completely normal

// Process pf Debugging:
// 1º Identify that there is a bug in the software
// The context is important: A bug may appear only for a certain user or in a certain browser
// 2º Find where the bug in the code is hapening. Can find by the developer console (simple code and small code) or if the code is big and you don't have an ideia wher ethe bug may be, use a Debugger software
// 3º Fix (correct) the bug. Fix the code by replecing the wrong solution with a new correct solution
// 4º prevent the bug from happening again. Search in a similar code for the same bug

///////////////////////////////////////////
// Debugging with the Console and Breakpoints

const measureKelving = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // C) FIX THE BUG
    // value: Number(prompt('Degrees celsius:')),
    value: 10,
  };

  // B) FIND THE BUG
  console.table(measurement);

  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) IDENTIFY THE BUG
console.log(measureKelving());

// Console.warn generates a warning in the console
// Console.error generates an error in the console
// Console.table generates a nice formated table in the console, it is good for bigger objects

// The browser already have a debugger, go to Inspect / Source / Then select the file you want to Debug
// The Brakpoint is where the execution of the code will stops

// Using a Debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudebug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) IDENTIFY THE BUG
console.log(amplitudebug);

// You can call the debugger using the debugger statement
*/
