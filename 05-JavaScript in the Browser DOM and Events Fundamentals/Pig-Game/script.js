'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting Conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

////////////////////////////////
// PROJECT #3: Pig Game

// A Flowchart is a representatio of everything that can happen in the application
// A Flowchart is good to create a todo list of the application, making it easier to translate that functionality into the code
// Diagrams.net is a good web site to create a Flowchart

// You can select an Id with the getElementyId Method. WIth this Method there's no need to use the has # before the name of the Id

// Comments are great to plan how we are going to write our code and structuring it

////////////////////////////////
// Rolling the Dice

// Creating a Flowchart is like dividing the big problem into a sub problems

// Remember that you can use the Comments to plan your way through the code

// Sometimes is good to separate an Element from a Value, like put the El An the end of a Variable that is an ELement

// When a Variable is inside a Function that Variable will be created each time that Function is called

// The Random Method returns a decimal between 0 and 1
// The trunc Method converts a decimal into a integer

// You can get the Atribute of an Element, simply after the seleteing the Element put a dot . and the name of the Atribute. element.src = "Name of the image.png"

// Don't leave the values to be stored only in the DOM, always have the values on your code

////////////////////////////////
// Switching the Active Player

// An Array index start from 0

// You can select an Element by Class, Id or other way, with a dinamyc way, meaing that you can put expression in the Argument of the Method

// Remember the ternary Operator

// The Toggle Method from the classList Property, will add the Class is the Class is not in the Element and remove the Class if the Class is on the ELement

////////////////////////////////
// Holding Current Score

// The Function inside the addEventListener will only be executed when the event happen

// It is usefull to add a Parameter in a Function when some data in the Function changes. But if the Function is supposed to return the same value over and over again, there is no need for a Parameter

// When Debuggin you may want to go line be line and value by value to see if everything is correct

// Sometimes you want to create a Variabe with a boolean type data, to say if something should keep working or not

// For boolean there's no need to write a condition

// With an If Statement, you can make a code work when only a condition is meet. Like a button will only work if a condition is met, otherwise it will do nothing

////////////////////////////////
// Resetting the Game

// You can tell JavaScript script to remove a class even if ths class is not there
// JavaScript will not add a class again if it's already in the element
// init stands for initialization
// Always remember to use Function and to call it
// A Variable declared inside a Function will only be acessed inside that Function and not outside, the Variable are Scoped
// To not be stuck in the Scoped Variables, just declare them on the Global Scope with no value. Ex: let variable;
// You can declare multiple variable in one line, just use comma , to declare a new variable on the same line (let or const)
// Declaring a variable is not the same as assigning a variable
// Yu can make a reference to a Function with the name of the Function without (), this will make JavaScript decide when to call this Function, it can be like an Event

///// Challenge

// <!--- MY SOLUTION ---!>

// btnNew.addEventListener('click', function () {
//   currentScore = 0;
//   playing = true;
//   activePlayer = 0;

//   current0El.textContent = currentScore;
//   current1El.textContent = currentScore;

//   for (let i = 0; i < scores.length; i++) {
//     scores[i] = 0;
//   }
//   score0El.textContent = scores[0];
//   score1El.textContent = scores[1];

//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
// });

// <!--- JONAS SOLUTION ---!>

// let scores, currentScore, activePlayer, playing;

// const init = function () {
//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   diceEl.classList.add('hidden');

//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
// };
// init();

// btnNew.addEventListener('click', init);
