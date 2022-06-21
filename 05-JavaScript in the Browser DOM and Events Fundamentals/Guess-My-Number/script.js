'use strict';

/*
//////////////////////////////////
// PROJECT #1: Guess My Number!

// To select an HTML Element you can use the document.querySelector("CSS selector"), and you can store it in a Variable
console.log(document.querySelector('.message').textContent);

// The textContent returns the text on an HTML Element

//////////////////////////////////
// What's the DOM and DOM Manipulation

// The ideia of making JavaScript interact with a webpage is called a DOM Manipulation

// DOM is a Document Object Model
// The DOM is a structured (Complete) representation of HTML. It allows JavaScript to acess the HTML file, Elements and styles. Basicaly is a conection between the HTML and the JavaScript.
// When JavaScript acess the DOM you can manipulate the HTML Docuement
// The Document Obejct is the entry point to the HTML
// Elements is every tag in HTML, and the text is the content thats between some of the tags
// After the Document Object comes the HTML Elemen, with 2 child ELements, the Head and Body, which also contains childs Elements
// Everything that's inside the HTML is also inside the DOM
// The DOM isn't inside the JavaScript language
// The DOM and DOM Methods are part of the Web Apis
// Web Apis are like library that the browser implements that you can acess with JavaScript
// Apis stands for Application Programming Interface
// There is no need to import Web Apis, this all happen behind the scenes

//////////////////////////////////
// Selecting and Manipulating Elements

// You can define the text of an Element
document.querySelector('.message').textContent = 'Correct Number!';
// A DOM Node is the selected Element. Ex: document.querySelector('.message'), The document.querySelector('.message') is the DOM Node

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// To get a Value of an Input, something that recieves data, use the value propertie
// You can also use the value propertie to manipulate an Element, or even to set a value
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

//////////////////////////////////
// Handling Click Events

// An Event is something that happens on the page, like a mouse click, a key press, and so on
// An Event Listener will wait until something (Event) happens to react to it

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// First you need to select the Element where the Event will be activated
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number!';
    displayMessage('No number!');

    // When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = 'Correct number!';
    displayMessage('Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? 'Too high' : 'Too low!';
      displayMessage(guess > secretNumber ? 'Too high' : 'Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You lost the game!';
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }

  // When guess is too high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too high';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

// You can add multiples classes in 1 Element, simply do that by putting a space between the name of the classes
// To create an Event Listener, use the addEventListener() Method. This is the best way and most common one
// There is 2 arguments for the Event Listener Method. The first one is the type of the Event, and it needs to be between (). And the second one, is what it should do, a reaction, basicaly a function, this function is called an Event Handler and is a Function Expression
// You can pass a Function as an Argument, because a Function, in the end, is just a value
// The Function pass as the Event Handler will not be called imediatly when the browser loads, it will wait until the Event happens

// Almost everything you get from the user interface, like a input, will be a String, sometimes will need to convert the value
// When there is a user input is good to check is there is a value
// When applying the logic is ggod to remember the Truthy and Fasly values
// When applying the logic the first cenario (if statement) is usualy when there is no value

//////////////////////////////////
// Implementing the Game Logic

// The Math is an Object that have Method that you can use, like the random() Method
// The Random Method give us a random number between 0 and 1. And to get a value between a certain max number, multiply the Random Method by this max number, if you want the Random number to go until this max number, add 1 to the whole equation
// The Trunc Method return the integer part of a number, discarting the decimals

// Sometimes it's better to define a value as a variable on the Script to later display the own value on the Page

// A State Variable is when all the data that relevant to the application is stored on our code
// You always want the data to be on our code and not just in the DOM
// You always want the data to be on our code and not just in the DO
// You can put an If Statement inside another If Statement

//////////////////////////////////
// Manipulating CSS Styles

// With the DOM Manipulation you can change styles
// You can select tags on the DOM, do that by simply writing the name of the tag Element, withou comma or has

// To manipulate the style of an Element use the Style property. Ex: document.querySelector("body").style
// After selecting the style of that Element, you can change the CSS property, by putting a dot after the Style and after the dot the name of the CSS Property
// The value of the CSS Property needs to be a String
// The style changed with the .Style Property are inline styles, they do not change the CSS file

//////////////////////////////////
// Challenge #1

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

// Anonymous Functions are those who doesn't have a nome

//////////////////////////////////
// Implementing Highscores

// Sometime you'll need a let variable to keep track of the values. And also for it to be on the Global Variable, if you wish so

//////////////////////////////////
// Refactoring Our Code: The DRY Principle

// Don't Repeat Yourself (DRY)

// It's bad to have repeated code, because when you want to change some functionality, you'll need to change it multiple times

// When you are starting to write the code, it's common to have duplicate code
// Refactoring means restructure the code without changin it's functionality, removing the repeated code and make it a little bit better
// The first thing when Refactoring a code is ti find the duplicate code or almost duplicate code
// A good Refactoring technique is to create Function
// When selecting a code, VSCode will highlight all the other same code in the file
// If the code that will run inside a Function is a DOM Manipulation, sometimes there's no ned to return the value. But it's always good to remember to return a value from a Function

// The Ternary Operator returns a value
