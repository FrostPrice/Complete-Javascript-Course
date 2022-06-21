'use strict';

/*
///////////////////////////////////
// Default Parameters

// Sometimes is usefull that Functions have Parameter that are set by default

const bookings = [];

// To set a default value on a Parameter simply put a = sign after the Parameter name and then the Value you want.
// A default Parameter is only used when there is no Value in the Argument section that would fill that Parameter
const createbooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5.
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createbooking('LH123');
createbooking('LH123', 2, 800);
createbooking('LH123', 2);
createbooking('LH123', 5);

createbooking('LH123', undefined, 1000);

// You can use Expressions as a Default Parameter. Also you can use the Value from a Parameter defined before

// You cannot skip Parameters when passing an Argument
// To skip a Parameter and use its Default Parameter Value simply pass Undefined as an Argument to the Parameter you want to skip

///////////////////////////////////
// How Passing Arguments Works: Value vs. Reference

const flight = 'Lh234';
const jonas = {
  name: 'Jonas Schmedtman',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passaport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

// When passing a Primitive type to a Parameter, a copy of that Value is made and the Function will use that copy instead of the original

// When a Reference Type is passed into a Parameter, a copy is not created but the Parameter is pointing to the same original Object, meaning tht if you change the Parameter Value in the Function it will also change the Original Value

// You should not change the Values of a Parameters in a Funtion

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

// JavaScript doesn't have passing by Reference, it only has passing by Value

// Passing by Reference means that you are going to pass a reference to a Value and then when you change that reference you change the original Value too

///////////////////////////////////
// First-Class and Higher-Order Functions

// JavaScript has First-Class Functions, this means Functions are just Values, they are just another Type of Object, also they are treated as first-citizens

// You can store Functions in Variables and as Properties inside an Object

// You can also pass Functions as Arguments to other Functions

// You can return a Function from a Function

// There is also Methods that you can call on Functions

// A Higher Order Function is a Function that returns a new Funtion or recieve a Function as Argument, or both. You can only do this because of First-level Classes

// A Function inside a High-Order Function is called CallBack Function. It is called that because this CallBack Function will be called later by the High-Order Function

///////////////////////////////////
// Functions Accepting Callback Functions

const oneWord = function (str) {
  // return str.replaceAll(' ', '').toLowerCase();
  return str.replaceAll(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// When passing a CallBack Function you don't put the (), because that would call the Function immediatelly, but without the () you are just making a reference to the Function and letting the Higher-Order Function Call the CallBack Function

// Functions have some Objects properties like the name property

// JS uses callbacks all the time
const high5 = function () {
  console.log('✋');
};
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// CallBack Function are good to: make more reusable and interconnected parts, and to obstruct our code

// Obstruction means that you hide some part of your code because you don't need all that detail, allowing us to think in a more abstract way about our code problems

///////////////////////////////////
// Functions Returning Functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // This Variable is a Function as return by the Function greet, and not a Value of the end execution of that Function, like a Primitive Value

// You can make a Function return other Function
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas'); // You can directly call another Function that returns a Function

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Jonas');

///////////////////////////////////
// The call and apply Methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {} or book() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'Jonh Smith');
console.log(lufthansa);

// The This Keyword points to the Function taht is calling it

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // You can store Method in Variables making it a copy and a regular Function

// Does NOT work
// book(23, 'Sarah Williams');
// On a regular Function the This Keyword is Undefined on Strict Mode

// Call Method
// A Function is just an Object and these Objects have Methods
book.call(eurowings, 23, 'Sarah Williams');
// The call() Method is used to tell JavaScript where to call a Function, meaning that it will tell where the This Keyword will point. The first Argument is where the Function is called and the rest is the Arguments passed in the Function normaly. And the call() Method comes after the Function,separated with a dot
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 589, 'Mary Cooper');

// Apply Method
// The apply() Method does the same thing as the call() Method, but after the first Argument that is where the This Keyword will point, it comes the Argument of the Function itself, but these Argument must be in an Array

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); // This is more common

///////////////////////////////////
// The bind Method
// The bind Method allow us to set where the This Keyword points in any Function call. But instead of imediatelly calling the Function, the bind() Method will return a new Function with the This Keyword set to that Function

// book.call(eurowings, 23, "Sarah Williams")

const bookEW = book.bind(eurowings); // You can store the result of a bind() Method in a Variable, meaning that you can call this Variable (Function) as many times as you want
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

// If you want you can set the Argument of the Function calling the bind() Method to be always the same one, after setting where the This Keyword will point
const bookEW23 = book.bind(eurowings, 23); // This is Partial Application
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// Partial Application means that a part of the Argument of the original Function are already set (defined)

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// With an Event Listener the This Keyword points to the Object calling the Event Listener

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
// When using the bind() Method for Partial Application, if you don't care about the This Keyword simply set the first Argument of the bind() Method to Null. Just watch out for the Paramerters order

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// Challenge#1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    // Register answer (With Short Circuiting)
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

///////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// Immediately Invoked Function Expressions (IIFE) are Functions that are inly called once in the start of the application and it will never run again.
// To create an IIFE just write a Function without name (No Variable Assign) and them wrap this Function inside (), this will turn the Function into an Expression, and to imediatelly call it just put a () after the () that is wrapping the Function

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate);

// You can use the IIFE with Arrow Functions too
(() => console.log('This will ALSO never run again'))();

// An Element created in a Scope can never be accessed by the Parent Scope, but a Child Scope can access an Element in the Parent Scope

// It is important to hide, protect Elements so that they can not be overwrite by accident

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// A Block also create its own Scope, but only when the Variables inside the Block are a Const or Let
// console.log(isPrivate);
console.log(notPrivate);

///////////////////////////////////
// Closures

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker); // console.dir() shows a list of Properties in a Object. And it takes an Object (Function) as Argument
// You can see the Closure with console.dir()

// Each Execution Context in the Call Stack has a Varible Enviroment that contains all the local Variables

// Call Stack is the order in which Functions are called
// The Scope Chain is the order in which Function are writen in the code

// After a Function finishes executing, this Function is removed from the Call Stack

// A Closure makes a Function "remember" all the Variables that existed on the place that the Function was created. Even after the Execution Context, of the Function that was the Parent of the Function called ,is gone

// A Fuction always have access to the Variable Enviroment of the Execution Context in which the Function was created, this conection between the Function and the Variable Enviroment of the Execution Context in which this Function was created is called Closure

// Closure is basically the Variable Enviroent attached to the Fuction, exactly as it was at the time and place the Function was created

// JavaScript will look first for a Closure if a Value is not present in the Function itself. It will look first in the Closure even if a Variable with the same name is created in the Global Scope

// The Closure has priority over the Scope Chain

// Closure Summary:
// 1. A Closure is the closed-over Variable Enviroment of the Execution Context in which a Function was created, even after that Execution Context is gone
// 2. A Closure gives a Function access to all the Variables of its parent Function, even after that parent Function has returned. The Function keeps a reference to its outer Scope, which preserves the Scope Chain throughout the time
// 3. A Closure makes sure that a Function doesn't loose connection to Variables that existed at the Function's birth place
// 4. A Closure is like a backpack that a Function carries around whereever it goes. This backpack has all the Variables that were present in the encironment where the Function was created

// REMEMBER: A Closure is a feature and not something we do manually, JavaScript does this automatically, and we cannot access Closures explicity

///////////////////////////////////
// More Closure Examples

// Exemple 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// You don't need to return a Function or define it inside a Parent Function to be able to "use" Closures

// If a Function is created in a Execution Context and then changed to another Execution Context, the Closure will be about the last Variable Environment it was "re-born" (Re-assigned)

// Exemple 2
const boardPassenger = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// The setTimeout() Function will run another Function (First Argument) based on a given time (Second Argument) that is usually in mileseconds

const perGroup = 1000; // A Closure has priority over the Scope Chain
boardPassenger(180, 3);

// A Closure includes Arguments passed in the Function

///////////////////////////////////
// Challenge#2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

// Answer: ALl this happen because of Closure
// By the time the Call Back Function in the Event Listener is called, the IIFE has already executed and the Execution Context of the IIFE is also gone. But even if the Variable Environment is gone the Call Back Function is still able to access the Variables in the Variable Environment that the Function was created
*/
